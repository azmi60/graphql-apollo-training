import { gql, useMutation } from "@apollo/client";

const CREATE_CART_TOKEN = gql`
  mutation CreateCartToken {
    createEmptyCart
  }
`;

export function useCartToken() {
  const [createCartToken] = useMutation(CREATE_CART_TOKEN);

  return async () => {
    const localToken = localStorage.getItem("token");
    if (!localToken) {
      const {
        data: { createEmptyCart: token },
      } = await createCartToken();
      localStorage.setItem("token", token);
      return token;
    }
    return localToken;
  };
}
