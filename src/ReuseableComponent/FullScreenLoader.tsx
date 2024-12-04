import React from "react";
import { Watch } from "react-loader-spinner";

const FullScreenLoader = ({ loading }: any) => {
  const loaderStyles: any = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  };

  return (
    <>
      {loading && (
        <div style={loaderStyles}>
          <Watch
            visible={loading}
            height="80"
            width="80"
            radius="48"
            color="#fff"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </>
  );
};

export default FullScreenLoader;
