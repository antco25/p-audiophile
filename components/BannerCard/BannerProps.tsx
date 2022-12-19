import { urlFor } from "../../lib/sanityClient";
import { ScreenSize } from "../../pages/_app";

export default interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  data: {
    header: [{ text: string, bold: boolean }[]],
    productSlug: string,
    description: [{ text: string, bold: boolean }[]],
    imageDesktop: string,
    imageTablet: string,
    imageMobile: string,
  },
  screenSize: ScreenSize,
  loaded: boolean
}

export const getBannerProps = (data: {
  header: any,
  product: any,
  description: any,
  imageDesktop: any,
  imageTablet: any
  imageMobile: any,
}): BannerProps => {
  const header = !data.header ? [] : data.header.map((content: any) => {
    return content.children.map((childContent: any) => {
      return { text: childContent.text, bold: childContent.marks.length !== 0 }
    })
  });

  const productSlug = data.product ? data.product.slug.current : '';

  const description = !data.description ? [] : data.description.map((content: any) => {
    return content.children.map((childContent: any) => {
      return { text: childContent.text, bold: childContent.marks.length !== 0 }
    })
  });

  const imageDesktop = urlFor(data.imageDesktop).url();
  const imageTablet = urlFor(data.imageTablet).url();
  const imageMobile = urlFor(data.imageMobile).url();

  return {
    data: { header, productSlug, description, imageDesktop, imageTablet, imageMobile }
  }
}