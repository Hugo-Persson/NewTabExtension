
//"Global Chrome" tells eslint that chrome is a valid variable which later will work when the code is run as an extensionin chrome
/*global chrome*/
import React, { useState, useEffect, useCallback } from 'react'
import "./App.css"
import Header from './Pages/Header';
import MainContent from './Pages/MainContent';
import Sidebar from './Pages/Sidebar/Sidebar';
import abandonedHouse from "./Wallpapers/AbandonedHouse.jpg";
import { MemoryRouter } from "react-router-dom";
import addButton from "./addButton.png";
import iconNotFound from "./iconNotFound.png";
export default function App() {

  const [, updateState] = useState();
  //forceUpdate forces the 
  const forceUpdate = useCallback(() => updateState({}), []);

  const [selectedQuickAccessItem, setSelectedQuickAccessItem] = useState({});
  const [backgroundImage, setBackgroundImage] = useState(abandonedHouse);
  const [settings, setSettings] = useState({
    ToDo: {
      taskLists: [
        /* {
          name: "TITLE",
          id: null,
          enabled: false,
        }, */


      ]
    },
    calendar: {
      calendarIDs: [
      ]
    },
    backgroundImage: abandonedHouse,
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
      name: "8",
      url: "https://www.reddit.com",
      image: "https://api.faviconkit.com/reddit.com/64",
      reRender: undefined
    },

    {
      name: "Add Link",
      url: "#",
      image: addButton,
      reRender: undefined
    }



  ]);
  const [syncQuickAccessLinks, setSyncQuickAccessLinks] = useState([{
    name: "Add Link",
    url: "#",
    image: addButton,
    reRender: undefined
  }]);

  useEffect(() => {
    // Toggle
    // loadChrome();
    function loadChrome() {

      chrome.storage.local.get("backgroundImage", (data => {
        if (data.backgroundImage !== undefined) setBackgroundImage(data.backgroundImage);
      }));
      chrome.storage.sync.get("settings", (chromeSettings) => {
        if (chromeSettings.settings !== undefined) {
          chrome.storage.local.get("backgroundImage", image => {
            if (image.backgroundImage !== undefined) {
              chromeSettings.backgroundImage = image.backgroundImage;
            }
            setSettings(chromeSettings.settings);
          });
        }
      });


      chrome.storage.sync.get("quickAccessLinks", sync => {
        //Otherwise first time using chrome extension
        console.log(sync);
        if (sync.quickAccessLinks !== undefined) {
          chrome.storage.local.get(["quickAccessLinks", "syncQuickAccessLinks"], local => {
            console.log(local);



            parseSyncQuickAccessLinks(sync.quickAccessLinks, local.syncQuickAccessLinks, local.quickAccessLinks);
          });

        }
      })
    }
  }, [])
  function formatUrl(url) {
    return url.substring(url.indexOf(".") + 1)
  }
  function parseSyncQuickAccessLinks(sync, syncLocal, local) {
    if (JSON.stringify(sync) !== JSON.stringify(syncLocal)) {
      console.log("syncing");
      console.log(sync);
      console.log(syncLocal);
      // Some other computer have changed the settings 
      setSyncQuickAccessLinks(JSON.parse(JSON.stringify(sync)));
      let promises = [];
      sync.map((value, index) => {
        if (value.image == "auto") {
          //Get automatic icon
          // TODO: Add check if local image exists and then take that
          const promise = fetchImageFromRemoteHost(`https://api.faviconkit.com/${formatUrl(value.url)}/64`);
          promises.push(promise);
          promise.then(src => {
            value.image = src;
          });

        }
        else {

          //Image is url to remote image
          const promise = fetchImageFromRemoteHost(value.image);
          promises.push(promise);
          promise.then(src => {
            value.image = src;
          });


        }
      });
      Promise.all(promises).then(() => {
        // saveQuickAccessLinks();
        console.log("SAVING!!");
        saveQuickAccessLinks();
        setQuickAccessLinks(sync);
      });
    }
    else {
      setQuickAccessLinks(local);
      setSyncQuickAccessLinks(syncLocal);
    }

  }
  function saveQuickAccessLinks() {
    console.log("SaveLocal");
    chrome.storage.local.set({ "quickAccessLinks": quickAccessLinks });
    chrome.storage.local.set({ "syncQuickAccessLinks": syncQuickAccessLinks });
  }
  function fetchImageFromRemoteHost(url) {
    return new Promise(resolve => {
      const init = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
      }
      fetch(url, init)
        .then((res) => res.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onload = function (e) {
            const src = "data:image/png;base64," + btoa(reader.result);
            resolve(src);

          }
          reader.readAsBinaryString(blob);

        })
        .catch(async (error) => {

          resolve(iconNotFound);
          console.log("Getting the icon automaticlly was not successful");

        });
    })

  }
  document.querySelector("html").style.backgroundImage = "url(" + backgroundImage + ")";

  return (
    <MemoryRouter >
      <React.Fragment>

        <Header name="Hugo Persson" settings={settings} />
        <MainContent quickAccessLinks={quickAccessLinks} updateApp={updateApp} settings={settings} selectedQuickAccessItem={selectedQuickAccessItem} asignSelectedQuickAccessItem={(object) => setSelectedQuickAccessItem(object)} />
        <Sidebar backgroundImage={backgroundImage} updateBackgroundImage={image => setBackgroundImage(image)} syncQuickAccessLinks={syncQuickAccessLinks} settings={settings} updateApp={updateApp} quickAccessLinks={quickAccessLinks} selectedQuickAccessItem={selectedQuickAccessItem} />

      </React.Fragment>
    </MemoryRouter>

  )


}
