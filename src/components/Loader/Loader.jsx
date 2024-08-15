import { Circles } from "react-loader-spinner";
import { Wrapper } from "./Loader.styled";

export const Loader = () => {
  return (
    <Wrapper>
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p>Loading cave...</p>
    </Wrapper>
  );
};
