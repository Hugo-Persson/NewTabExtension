
//"Global Chrome" tells eslint that chrome is a valid variable which later will work when the code is run as an extensionin chrome
/*global chrome*/
import React, { useState, useEffect, useCallback } from 'react'
import "./App.css"
import Header from './Pages/Components/Header';
import MainContent from './Pages/MainContent';
import Sidebar from './Pages/Sidebar';
import AbandonedHouse from "./Wallpapers/AbandonedHouse.jpg";
import { MemoryRouter } from "react-router-dom";
import AddButton from "./addButton.png";
export default function App() {

  const [, updateState] = useState();
  //forceUpdate forces the 
  const forceUpdate = useCallback(() => updateState({}), []);

  const [selectedQuickAccessItem, setSelectedQuickAccessItem] = useState({});
  const [settings, setSetting] = useState({
    ToDo: {
      taskLists: [
        {
          name: "TITLE",
          id: null,
          enabled: false,
        },


      ]
    },
    calendar: {
      calendarIDs: [
        {
          name: "SUMMARY",
          id: null,
          enabled: false,
        },
        {
          name: "SUMMARY",
          id: null,
          enabled: false,
        },
        {
          name: "SUMMARY",
          id: null,
          enabled: false,
        },

      ]
    },
    backgroundImage: AbandonedHouse,
    defaultRoute: "/settings/customization",
    dateFormat: "automatic",
    units: "metric",
    location: {
      auto: true,
      city: undefined,
      lat: undefined,
      lon: undefined,

    }
  })
  function updateApp() {
    forceUpdate();

  }

  const [quickAccessLinks, setQuickAccessLinks] = useState([
    {
      name: "1",
      url: "https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64",
      reRender: undefined
    },
    {
      name: "2",
      url: "https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64",
      reRender: undefined
    },
    {
      name: "3",
      url: "https://www.reddit.com",
      image: "https://cdn.freebiesupply.com/images/large/2x/facebook-logo-circle-transparent.png",
      reRender: undefined
    },
    {
      name: "4",
      url: "https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64",
      reRender: undefined
    },
    {
      name: "5",
      url: "https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64",
      reRender: undefined
    },
    {
      name: "6",
      url: "https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64",
      reRender: undefined
    },
    {
      name: "7",
      url: "https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64",
      reRender: undefined

    },
    {
      name: "8",
      url: "https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64",
      reRender: undefined
    },

    {
      name: "Add Link",
      url: "#",
      image: AddButton,
      reRender: undefined
    }



  ]);

  useEffect(() => {
    // Toggle
    // LoadChrome();
    function LoadChrome() {

      chrome.storage.sync.get("settings", function (chromeSettings) {
        if (chromeSettings.settings === undefined) {
          chrome.storage.sync.set({ "settings": settings }, () => {
          });
        }
        else {
          setSetting(chromeSettings.settings);
        }

      })
      chrome.storage.sync.get("quickAccessLinks", function (data) {
        if (data.quickAccessLinks != undefined) {


          setQuickAccessLinks(data.quickAccessLinks);
        }
        else {
          chrome.storage.sync.set({ "quickAccessLinks": quickAccessLinks });
        }
      })
    }
  }, [])

  document.querySelector("html").style.backgroundImage = "url(" + settings.backgroundImage + ")";

  return (
    <MemoryRouter >
      <React.Fragment>

        <Header name="Hugo Persson" settings={settings} />
        <MainContent quickAccessLinks={quickAccessLinks} updateApp={updateApp} settings={settings} selectedQuickAccessItem={selectedQuickAccessItem} asignSelectedQuickAccessItem={(object) => setSelectedQuickAccessItem(object)} />
        <Sidebar settings={settings} updateApp={updateApp} quickAccessLinks={quickAccessLinks} selectedQuickAccessItem={selectedQuickAccessItem} />

      </React.Fragment>
    </MemoryRouter>

  )


}
