import BaseImage, { ImageProps } from "next/image";

export default function Image(props: ImageProps) {
  return <BaseImage {...props} />;
}
