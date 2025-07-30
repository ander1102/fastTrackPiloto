import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_CONFIGURATION } from "@app/constants";
import { assetsConfig } from "../../../assets.config";
import { toPng, toBlob } from "html-to-image";
export const useQRDownload = () => {
  const canvasQRRef = useRef(null);
  const canvasDownloadRef = useRef<HTMLCanvasElement | null>(null);

  const [canvasDownload, setCanvasDownload] =
    useState<HTMLCanvasElement | null>();

  useEffect(() => {
    generateDowloadCanvas();
  }, []);

  const generateDowloadCanvas = () => {
    setTimeout(() => {
      const node = canvasQRRef.current;
      if (!node) return;

      toPng(node).then(function (dataURL) {
        const canvas = canvasDownloadRef.current;
        if (!canvas) return;
        canvas.width = 540;
        canvas.height = 760;
        canvas.style.display = "none"; // Ocultar el canvas inicialmente
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const image1 = new Image();
        const image2 = new Image();

        image1.src = assetsConfig.pagos_distancia.qr_download_template;
        image2.src = dataURL;

        image1.onload = () => {
          if (image2.complete) drawImages();
        };

        image2.onload = () => {
          if (image1.complete) drawImages();
        };
        const drawImages = () => {
          ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
          ctx.drawImage(image2, 180, 185, 180, 180);
        };

        setCanvasDownload(canvas);
      });
    }, 1000);
  };

  const handleQRDownload = () => {
    if (!canvasDownload) return;
    const dataURL = canvasDownload.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "qrcode.png";
    link.click();
    link.remove();
    toast.success(
      "El QR se ha descargado correctamente.",
      DEFAULT_TOAST_CONFIGURATION
    );
  };

  const handleCopyQR = async () => {
    const node = canvasQRRef.current;
    if (!node) return;
    try {
      const fileBlob = await toBlob(node);
      if (fileBlob) {
        await navigator.clipboard.write([
          new ClipboardItem({ [fileBlob.type]: fileBlob }),
        ]);
        toast.success(
          "El QR se ha copiado correctamente.",
          DEFAULT_TOAST_CONFIGURATION
        );
      }
    } catch (err) {
      toast.error(
        "Ha ocurrido un error al copiar el QR. Intente más tarde.",
        DEFAULT_TOAST_CONFIGURATION
      );
    }
  };

  return {
    handleQRDownload,
    handleCopyQR,
    canvasDownloadRef,
    canvasQRRef,
  };
};
