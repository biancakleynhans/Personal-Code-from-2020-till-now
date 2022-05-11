import { iCart, iProduct } from "../../models/Products";

interface iProps {
  cart: iCart[];
  inventory: iProduct[];
}

export default function CheckIfAvailable(props: iProps): iCart[] {
  let cleanedCart: iCart[] = [...props.cart];

  if (props.inventory && props.cart) {
    props.cart.forEach((cartItem, cartIndex) => {
      props.inventory.forEach((inv, invIndex) => {
        if (cartItem.prodId === inv.id) {
          console.log("found match", cartItem.prodId);
          if (inv.stock < cartItem.prodCount) {
            if (inv.stock === 0) {
              console.log("No  items in stock", cartIndex, cartItem);
              cleanedCart.splice(cartIndex, 1);
              console.log("cleanedCart", cleanedCart);
            } else {
              console.log("Not enough items in stock", cartIndex, cartItem);
              cartItem.prodCount = inv.stock;
              console.log("cleanedCart", cleanedCart);
            }
          }
        }
      });
    });
  }

  return cleanedCart;
}
