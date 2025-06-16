import { InputText } from "primereact/inputtext";
import { CatCountries } from "@app/components/Dropdowns";
import StatesDropdown from "@app/components/Dropdowns/states";
import Grid from "@app/components/Grid";
import { FormItem } from "@app/layout/clientes/templates";

export const DirecctionForm = ({
  setAddress,
  address,
  validationErrors,
  clearValidationError,
}: any) => {
  return (
    <>
      <div>
        <Grid xl={1} gap={4}>
          <FormItem
            maxWidth="max-w-full"
            title={"Calle *"}
            labelError={validationErrors.street}
          >
            <InputText
              name="street"
              placeholder={"Nombre de la calle"}
              value={address.street}
              onChange={(e) => {
                setAddress({ ...address, street: e.target.value });
                clearValidationError("street");
              }}
              style={
                validationErrors.street
                  ? {
                      borderColor: "#FF5758",
                      backgroundColor: "#FEE",
                      width: "80%",
                      height: 42,
                      borderRadius: 6,
                    }
                  : { width: "80%", height: 42, borderRadius: 6 }
              }
            />
          </FormItem>
        </Grid>
        <Grid xl={2} gap={4}>
          <FormItem
            maxWidth="max-w-full"
            title={"Colonia *"}
            labelError={validationErrors.neighborhood}
          >
            <InputText
              name="neighborhood"
              placeholder={"Nombre de la colonia"}
              value={address.neighborhood}
              onChange={(e) => {
                setAddress({ ...address, neighborhood: e.target.value });
                clearValidationError("neighborhood");
              }}
              style={
                validationErrors.neighborhood
                  ? {
                      borderColor: "#FF5758",
                      backgroundColor: "#FEE",
                      width: "80%",
                      height: 42,
                      borderRadius: 6,
                    }
                  : { width: "80%", height: 42, borderRadius: 6 }
              }
            />
          </FormItem>
          <Grid xl={2} md={2} sm={1} gap={4}>
            <FormItem
              maxWidth="max-w-full"
              title={"Número Ext. *"}
              labelError={validationErrors.extNumber}
            >
              <InputText
                name="extNumber"
                placeholder={"# Exterior"}
                value={address.extNumber}
                onChange={(e) => {
                  setAddress({ ...address, extNumber: e.target.value });
                  clearValidationError("extNumber");
                }}
                style={
                  validationErrors.extNumber
                    ? {
                        borderColor: "#FF5758",
                        backgroundColor: "#FEE",
                        width: "60%",
                        height: 42,
                        borderRadius: 6,
                      }
                    : { width: "60%", height: 42, borderRadius: 6 }
                }
              />
            </FormItem>
            <FormItem title={"Número Int."}>
              <InputText
                name="intNumber"
                placeholder={"# Interior"}
                value={address.intNumber}
                onChange={(e) =>
                  setAddress({ ...address, intNumber: e.target.value })
                }
                style={{ width: "60%", height: 42, borderRadius: 6 }}
              />
            </FormItem>
          </Grid>
        </Grid>
        <Grid xl={2} gap={4}>
          <FormItem
            maxWidth="max-w-full"
            title={"Delegación *"}
            labelError={validationErrors.district}
          >
            <InputText
              name="district"
              placeholder={"Delegación"}
              value={address.district}
              onChange={(e) => {
                setAddress({ ...address, district: e.target.value });
                clearValidationError("district");
              }}
              style={
                validationErrors.district
                  ? {
                      borderColor: "#FF5758",
                      backgroundColor: "#FEE",
                      width: "80%",
                      height: 42,
                      borderRadius: 6,
                    }
                  : { width: "80%", height: 42, borderRadius: 6 }
              }
            />
          </FormItem>
          <FormItem
            maxWidth="max-w-full"
            title={"Código postal *"}
            labelError={validationErrors.zipCode}
          >
            <InputText
              name="street"
              placeholder={"Código postal"}
              value={address.zipCode}
              onChange={(e) => {
                setAddress({ ...address, zipCode: e.target.value });
                clearValidationError("zipCode");
              }}
              style={
                validationErrors.zipCode
                  ? {
                      borderColor: "#FF5758",
                      backgroundColor: "#FEE",
                      width: "80%",
                      height: 42,
                      borderRadius: 6,
                    }
                  : { width: "80%", height: 42, borderRadius: 6 }
              }
            />
          </FormItem>
        </Grid>
        <Grid xl={2} gap={4}>
          <FormItem
            maxWidth="max-w-full"
            title={"Ciudad *"}
            labelError={validationErrors.city}
          >
            <InputText
              name="city"
              placeholder={"Ciudad"}
              value={address.city}
              onChange={(e) => {
                setAddress({ ...address, city: e.target.value });
                clearValidationError("city");
              }}
              style={
                validationErrors.city
                  ? {
                      borderColor: "#FF5758",
                      backgroundColor: "#FEE",
                      width: "80%",
                      height: 42,
                      borderRadius: 6,
                    }
                  : { width: "80%", height: 42, borderRadius: 6 }
              }
            />
          </FormItem>
          <FormItem
            maxWidth="max-w-full"
            title={"Estado *"}
            labelError={validationErrors.state}
          >
            <StatesDropdown
              name="infoDomicilio.estado"
              country={address.country ?? ""}
              value={address.state}
              onChange={(e: any) => {
                setAddress({ ...address, state: e.target.value });
                clearValidationError("state");
                clearValidationError("state");
              }}
              disabled={false}
              placeholder="Estado"
              style={
                validationErrors.state
                  ? {
                      borderColor: "#FF5758",
                      backgroundColor: "#FEE",
                      width: "80%",
                      height: 42,
                      borderRadius: 6,
                    }
                  : { width: "80%", height: 42, borderRadius: 6 }
              }
            />
          </FormItem>
        </Grid>
        <Grid xl={2} gap={4}>
          <FormItem
            maxWidth="max-w-full"
            title={"País *"}
            labelError={validationErrors.country}
          >
            <CatCountries
              name="infoDomicilio.pais"
              value={address.country}
              onChange={({ value }: any) => {
                setAddress({ ...address, country: value });
                clearValidationError("country");
              }}
              placeholder="País"
              filter
              style={
                validationErrors.country
                  ? {
                      borderColor: "#FF5758",
                      backgroundColor: "#FEE",
                      width: "80%",
                      height: 42,
                      borderRadius: 6,
                    }
                  : { width: "80%", height: 42, borderRadius: 6 }
              }
            />
          </FormItem>
        </Grid>
      </div>
    </>
  );
};
