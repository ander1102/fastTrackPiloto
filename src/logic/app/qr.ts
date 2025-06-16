import QRCode from "qrcode";

namespace QR {
  export const generateImage = async (text: string): Promise<string> =>
    await QRCode.toDataURL(text);
}

export default QR;
