import Head from "next/head";
import React, { useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { Button } from "@app/components/Buttons";
import { FormItem } from "@app/components/FormManager/FormItem";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useFormik } from "formik";
import useEffectAsync from "@app/hooks/useEffectAsync";
import useTruncateAmout from "@app/hooks/useTruncateAmount";
import { PagosRecurrentesController } from "@app/logic/backend/pagosRecurrentes";
import { toast } from "react-toastify";
import {
  ESTATUS_TYPES,
  PagosRecurrentesCheckoutReadBody,
  PagosRecurrentesCheckoutReadResponse,
  RECURRENCIA_TYPES,
} from "@app/types/PagosRecurrentes";
import {
  INIT_VALUE_INFO_CHECKOUT,
  INIT_VALUE_PERSONAL,
  YYYY_OPTIONS,
  MM_OPTIONS,
  IMAGES_PATH,
  CURRENT_YEAR,
  VALIDATION_PERSONAL,
  VALIDATION_CARD,
  INITAL_VALUE_CARD,
} from "@app/constants/pagosRecurrentes";
import { useRouter } from "next/router";
import { DateDDMMYY } from "@app/common/date";
import CryptoJS from "crypto-js";
import {
  CardNotFound,
  PageContainer,
  CardDeclined,
  CompraSegura,
  CardSuccess,
  Footer,
  CardTitle,
  Card,
  CardEmail,
  CardEmailSuccess
} from "@app/layout/pagosrecurrentes/checkout";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
//STATIC LAYOUT

export default function pagosRecurrentes() {
  const [showPersonal, setShowPersonal] = useState(true);
  const [showCard, setShowCard] = useState(true);
  const [infoCheckout, setInfoCheckout] =
    useState<PagosRecurrentesCheckoutReadResponse>(INIT_VALUE_INFO_CHECKOUT);
  const router = useRouter();
  const { token, email } = router.query;
  const [toogleTerminos, setToogleTerminos] = useState(false);
  const [loader, setLoader] = useState(false);
  const [ready, setReady] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isEmailSuccess, setIsEmailSuccess] = useState(false);

  useEffectAsync(async () => {
    if (token) {
      const currentToken: string = token as string;
      const result = await PagosRecurrentesController.readCheckout({
        token: currentToken,
      } as PagosRecurrentesCheckoutReadBody);

      if (
        result.isSuccess &&
        result.response.mensaje != "Sin criterios" &&
        result.response.estatus == ESTATUS_TYPES.Activo
      ) {
        setInfoCheckout({ ...result.response, token: currentToken });
        setIsNotFound(false);

        if (email) {
          setIsEmail(true);
        }
      } else {
        setIsNotFound(true);
      }

      setTimeout(() => {
        setReady(false);
      }, 1000);
    }
  }, [token, email]);

  const handleSubmitPersonal = () => {
    setShowPersonal(false);
  };
  const handleSubmitCard = () => {
    setShowCard(false);
  };

  const handlePayWithEfevoo = async () => {
    setLoader(true);

    const callCreateSubscribers =
      await PagosRecurrentesController.createSubscribers({
        idagep_usuario: 0,
        idagep_empresa: 0,
        nombre: formikPersonal.values.nombre,
        email: formikPersonal.values.email,
        infoSuscriptor: {
          telefono: formikPersonal.values.telefono,
          direccion: "",
        },
        estatus: 1,
        token: infoCheckout.token,
      });

    const message = {
      track2: `${formikCard.values.tarjeta}=${formikCard.values.yy}${formikCard.values.mm}`,
      cvv: formikCard.values.cvv,
      amount: infoCheckout.monto,
    };

    const currentData = CryptoJS.AES.encrypt(
      JSON.stringify(message),
      CryptoJS.enc.Utf8.parse(infoCheckout.infoEmp),
      {
        iv: CryptoJS.enc.Utf8.parse(infoCheckout.infoPago),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    const callCreateCheckout = await PagosRecurrentesController.createCheckout({
      token: infoCheckout.token,
      idSuscriptor: callCreateSubscribers.response.idSuscriptor ?? 0,
      data: currentData.toString(),
    });

    setReady(true);

    setTimeout(() => {
      if (callCreateCheckout.response.mensaje == "Pago procesado con éxito") {
        setIsSuccess(true);
      } else {
        setIsDeclined(true);
      }
      setReady(false);
    }, 1000);

    setLoader(false);
  };

  const handleCancelSubscribers = async () => {
    setLoader(true);

    const call = await PagosRecurrentesController.cancelSubscribers({
      token: infoCheckout.token,
      email: email as string,
    });

    setTimeout(() => {
      if (call.isSuccess) {
        if (call.response.mensaje == "Baja de pago recurrente") {
          setIsEmail(false)
          setIsEmailSuccess(true)
        } else {
          toast.error(call.response.mensaje, DEFAULT_TOAST_CONFIGURATION);
        }
      } else {
        toast.error(
          "Ha ocurrido un error al cancelar la suscripción",
          DEFAULT_TOAST_CONFIGURATION
        );
      }
    }, 1000);

    setLoader(false);
  };

  const formikPersonal = useFormik({
    initialValues: INIT_VALUE_PERSONAL,
    validationSchema: VALIDATION_PERSONAL,
    onSubmit: handleSubmitPersonal,
    validateOnChange: false,
  });

  const formikCard = useFormik({
    initialValues: INITAL_VALUE_CARD,
    validationSchema: VALIDATION_CARD,
    onSubmit: handleSubmitCard,
    validateOnChange: false,
  });

  return (
    <>
      <Head>
        <title>Efevoo Pay Agregador</title>
        <meta name="description" content="Efevoo Pay Agregador" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/mini2.png" />
      </Head>

      <PageContainer>
        <h3 className="text-4xl text-center text-white m-5 ">
          {isEmail ? "Cancelar Suscripción" : "Checkout"}
        </h3>

        {ready ? (
          <div className="bg-white w-screen h-screen absolute left-0 opacity-90">
            <div className="flex justify-center items-center h-full w-full">
              <img
                src={IMAGES_PATH.LOADER}
                width={200}
                className="animate-spin"
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-between flex-wrap gap-16 w-[95%] sm:w-full mx-auto ">
            {isNotFound && <CardNotFound />}

            {isDeclined && <CardDeclined />}

            {isEmail && (
              <CardEmail
                infoCheckout={infoCheckout}
                email={email as string}
                onCancelSubscribers={handleCancelSubscribers}
                loader={loader}
              />
            )}

            {isEmailSuccess && <CardEmailSuccess />}

            {!isNotFound && !isDeclined && !isEmail && !isEmailSuccess && (
              <>
                <div className="flex flex-col gap-10 w-full xl:w-[60%]">
                  {isSuccess ? (
                    <CardSuccess />
                  ) : (
                    <>
                      <Card className="animate-fadeIn">
                        <CardTitle
                          step="1"
                          title="Datos personales"
                          classColor={
                            showPersonal ? "bg-dark" : "bg-purple-dark"
                          }
                        />
                        {showPersonal ? (
                          <div className="grid grid-cols gap-y-5 w-full p-10">
                            <FormItem
                              label="Nombre y apellido"
                              required
                              error={formikPersonal.errors.nombre}
                            >
                              <InputText
                                placeholder="Escribe tu nombre y apellido"
                                className="!rounded-xl"
                                value={formikPersonal.values.nombre}
                                onChange={({ target }) =>
                                  formikPersonal.setFieldValue(
                                    "nombre",
                                    target.value
                                  )
                                }
                              />
                            </FormItem>
                            <FormItem
                              label="Número de celular"
                              required
                              error={formikPersonal.errors.telefono}
                            >
                              <InputText
                                placeholder="Escribe tu número de celular"
                                className="w-full !rounded-xl"
                                maxLength={10}
                                value={formikPersonal.values.telefono}
                                onChange={({ target }) =>
                                  formikPersonal.setFieldValue(
                                    "telefono",
                                    target.value
                                  )
                                }
                                onKeyPress={(e) => {
                                  const keyCode = e.keyCode || e.which;
                                  const char = String.fromCharCode(keyCode);
                                  if (!/[0-9]/.test(char)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </FormItem>
                            <FormItem
                              label="Correo electrónico"
                              required
                              error={formikPersonal.errors.email}
                            >
                              <InputText
                                placeholder="Escribe tu correo electrónico"
                                className="!rounded-xl"
                                type="email"
                                value={formikPersonal.values.email}
                                onChange={({ target }) =>
                                  formikPersonal.setFieldValue(
                                    "email",
                                    target.value
                                  )
                                }
                              />
                            </FormItem>
                            <div className="flex justify-center">
                              <Button
                                className="button-save !rounded-xl"
                                onClick={() => formikPersonal.submitForm()}
                              >
                                Guardar
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-y-5 w-full p-10">
                            <div
                              className="absolute top-11 right-10 cursor-pointer"
                              onClick={() => setShowPersonal((prev) => !prev)}
                            >
                              <img src={IMAGES_PATH.EDITAR} />
                            </div>

                            <span className="text-purple-dark">
                              {formikPersonal.values.nombre}
                            </span>
                            <span className="text-purple-dark">
                              {formikPersonal.values.telefono}
                            </span>
                            <span className="text-purple-dark underline">
                              {formikPersonal.values.email}
                            </span>
                          </div>
                        )}
                      </Card>

                      <Card className="animate-fadeIn">
                        <CardTitle
                          step="2"
                          title="Debito/Crédito"
                          classColor={showCard ? "bg-dark" : "bg-purple-dark"}
                        />
                        {showCard ? (
                          <div className="grid grid-cols-2 gap-x-16 gap-y-5 w-full">
                            <FormItem
                              className="col-span-2"
                              label="Número de la tarjeta"
                              required
                              error={formikCard.errors.tarjeta}
                            >
                              <InputText
                                placeholder="Escribe tu número de la tarjeta"
                                className="!rounded-xl"
                                value={formikCard.values.tarjeta}
                                onChange={({ target }) =>
                                  formikCard.setFieldValue(
                                    "tarjeta",
                                    target.value
                                  )
                                }
                                onKeyPress={(e) => {
                                  const keyCode = e.keyCode || e.which;
                                  const char = String.fromCharCode(keyCode);
                                  if (!/[0-9]/.test(char)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </FormItem>

                            <FormItem
                              label="Fecha de expiración"
                              required
                              error={
                                formikCard.errors.mm || formikCard.errors.yy
                              }
                            >
                              <div className="flex gap-3 ">
                                <Dropdown
                                  options={MM_OPTIONS}
                                  placeholder="MM"
                                  className="!rounded-xl w-full"
                                  value={formikCard.values.mm}
                                  onChange={({ target }) =>
                                    formikCard.setFieldValue("mm", target.value)
                                  }
                                />
                                <Dropdown
                                  options={YYYY_OPTIONS}
                                  placeholder="AÑO"
                                  className="!rounded-xl w-full"
                                  value={formikCard.values.yy}
                                  onChange={({ target }) =>
                                    formikCard.setFieldValue("yy", target.value)
                                  }
                                />
                              </div>
                            </FormItem>

                            <FormItem
                              label="CVV"
                              required
                              error={formikCard.errors.cvv}
                            >
                              <InputText
                                placeholder="CVV"
                                className="w-full !rounded-xl"
                                maxLength={4}
                                value={formikCard.values.cvv}
                                onChange={({ target }) =>
                                  formikCard.setFieldValue("cvv", target.value)
                                }
                                onKeyPress={(e) => {
                                  const keyCode = e.keyCode || e.which;
                                  const char = String.fromCharCode(keyCode);
                                  if (!/[0-9]/.test(char)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                            </FormItem>
                            <div className="col-span-2 flex justify-center">
                              <Button
                                className="button-save  !rounded-xl"
                                disabled={showPersonal}
                                onClick={formikCard.submitForm}
                              >
                                Guardar
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-y-5 w-full p-10">
                            <div
                              className="absolute top-11 right-10 cursor-pointer"
                              onClick={() => setShowCard((prev) => !prev)}
                            >
                              <img src={IMAGES_PATH.EDITAR} />
                            </div>

                            <span className="text-purple-dark col-span-2 ">
                              {formikCard.values.tarjeta}
                            </span>
                            <span className="text-purple-dark">
                              {formikCard.values.mm}/
                              {CURRENT_YEAR.toString().slice(0, 2)}
                              {formikCard.values.yy}
                            </span>
                            <span className="text-purple-dark">
                              {formikCard.values.cvv}
                            </span>
                          </div>
                        )}
                      </Card>

                      <div
                        className="animate-fadeIn flex gap-3 cursor-pointer"
                        onClick={() => setToogleTerminos((prev) => !prev)}
                      >
                        <img
                          src={
                            toogleTerminos
                              ? IMAGES_PATH.CHECKBOX_ACTIVO
                              : IMAGES_PATH.CHECKBOX_INACTIVO
                          }
                        />
                        <p className="text-sm text-white">
                          Acepto{" "}
                          <a
                            href="https://efevoopay.com/Terminos"
                            target="_bank"
                            className="underline"
                          >
                            Términos y Condiciones{" "}
                          </a>
                          asi como el{" "}
                          <a
                            href="https://efevoopay.com/AvisoDePrivacidad"
                            target="_bank"
                            className="underline"
                          >
                            {" "}
                            Aviso de Privacidad
                          </a>{" "}
                          para Pagos Recurrentes.
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-10  mx-auto sm:!m-0 sm:w-full xl:w-[30%]">
                  <Card className="animate-fadeIn max-w-[500px]">
                    <img
                      src={IMAGES_PATH.EFEVOOPAY_BLACK}
                      className="w-32 m-auto"
                    />
                    <p className="text-primary text-center text-lg">
                      Resumen de compra
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-light">Pago</span>
                      <span className="text-gray-light  text-right">
                        {infoCheckout.pagoRecurrente}
                      </span>
                      <span className="text-gray-light">Recurrencia</span>
                      <span className="text-gray-light  text-right">
                        {RECURRENCIA_TYPES[infoCheckout.recurrencia]}
                      </span>
                      <span className="text-gray-light">Importe</span>
                      <span className="text-gray-light  text-right">
                        {useTruncateAmout(infoCheckout.monto)}
                      </span>
                      <span className="text-gray-light">
                        Fecha de del siguiente cobro
                      </span>
                      <span className="text-gray-light  text-right">
                        {DateDDMMYY(new Date(infoCheckout.sigConbro))}
                      </span>

                      <img
                        src={IMAGES_PATH.LINEA}
                        className="mt-3 mb-6 col-span-2"
                      />
                      <span className="text-black text-xl">Total</span>
                      <span className="text-black text-xl text-right">
                        {useTruncateAmout(infoCheckout.monto)}
                      </span>

                      {!isSuccess && (
                        <Button
                          className="button-save !w-full !rounded-xl col-span-2 gap-2"
                          onClick={handlePayWithEfevoo}
                          disabled={
                            loader ||
                            showPersonal ||
                            showCard ||
                            !toogleTerminos
                          }
                          loading={loader}
                        >
                          <div className="flex gap-2">
                            <span>Pagar con</span>
                            <img
                              src={IMAGES_PATH.EFEVOO_WHITE}
                              width={60}
                              className="mb-1"
                            />
                          </div>
                        </Button>
                      )}
                    </div>
                  </Card>
                  <CompraSegura />
                </div>
              </>
            )}

            <Footer />
          </div>
        )}
      </PageContainer>
    </>
  );
}
