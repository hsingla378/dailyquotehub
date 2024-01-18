import axios from "axios";
import { enqueueSnackbar } from "notistack";
import React from "react";

const useDeleteQuote = ({ token, quoteId }) => {
  let data = "";

  if (!token) {
    enqueueSnackbar("Kindly login!", {
      variant: "success",
      persist: false,
    });
    return;
  }

  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: import.meta.env.VITE_BACKEND_URL + "/quotes/" + quoteId,
    headers: {
      Authorization: token,
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      enqueueSnackbar(response.data.message, {
        variant: "success",
        persist: false,
      });
    })
    .catch((error) => {
      enqueueSnackbar(error, {
        variant: "error",
        persist: false,
      });
    });
};

export default useDeleteQuote;
