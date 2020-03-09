import React, { useState, useCallback, useEffect } from "react";
import Search from "features/Search/Search";
import Links from "features/Links/Links";
import Api from "common/Api";
import "./app.css";
const api = new Api();
const URL = "http://avoindata.prh.fi/ytj.html";
const AUTH = `${URL}/api/user/token/`;
const LINKS = `${URL}/api/link2/`;

function App() {
  const [state, setState] = useState({
    isLoggingIn: "",
    token: { refresh: "", access: "" },
    SearchError: "",
    links: [],
    fetchError: ""
  });
  const { access } = state.token;

  const _getLinks = useCallback(
    async function() {
      if (!access) return;
      try {
        const links = await api.get(LINKS, access);
        setState(prevState => {
          return { ...prevState, links };
        });
      } catch (error) {
        setState(prevState => {
          return { ...prevState, fetchError: error.message };
        });
      }
    },
    [access]
  );

  async function handleInitiatedSearch(payload) {
    try {
      const token = await api.post(AUTH, payload);
      setState(prevState => {
        return { ...prevState, isLoggingIn: "yes" };
      });
      setTimeout(
        () =>
          setState(prevState => {
            return { ...prevState, token };
          }),
        3000
      );
    } catch (error) {
      setState(prevState => {
        return { ...prevState, SearchError: error.message };
      });
    }
  }

  useEffect(() => {
    _getLinks();
  }, [_getLinks]);

  function cleanError() {
    setState(prevState => {
      return { ...prevState, SearchError: "" };
    });
  }

  return (
    <>
      <Search
        initiatedSearch={handleInitiatedSearch}
        isLoggingIn={state.isLoggingIn}
        SearchError={state.SearchError}
        cleanError={cleanError}
        accessToken={state.token.access}
      />
      <Links links={state.links} />
    </>
  );
}

export default App;
