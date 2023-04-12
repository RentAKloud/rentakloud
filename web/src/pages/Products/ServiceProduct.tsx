import { Component } from "solid-js";
import HeroWithBg from "../../components/Hero/HeroWithBg";
import { Product } from "../../types/product";

export const ServiceProduct: Component<{ product: Product }> = (props) => {
  return (
    <>
      <HeroWithBg
        title={`Simple and Reliable ${props.product.name} Databases`}
        subtitle={`Worry-free ${props.product.name} hosting so you can focus on building great apps.`}
        header={<span class="uppercase">{props.product.categories.join(", ")}</span>}
        bgUrl="https://webimages.mongodb.com/_com_assets/cms/l4hecgagkqphn9kc9-ART.svg?ixlib=js-3.7.1&auto=format%2Ccompress&w=3038"
        align='left'
        contain
      >
      </HeroWithBg>
      {props.product.name}
    </>
  )
}