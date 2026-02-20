import React, { useState } from "react";

const Test = () => {
  const [fullAddress, setFullAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [stateSuggestions, setStateSuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [activeField, setActiveField] = useState(""); // New state to track the active field

  const fetchSuggestions = async (input, setSuggestions) => {
    if (input.length > 2) {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=18adce920e6a41ee9cd23a9ad266d617`
      );
      const data = await response.json();

      if (data && data.features) {
        const results = data.features.map(
          (feature) => feature.properties.formatted
        );
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleFullAddressChange = (e) => {
    setFullAddress(e.target.value);
    setActiveField("fullAddress");
    fetchSuggestions(e.target.value, setAddressSuggestions);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    setActiveField("state");
    fetchSuggestions(e.target.value, setStateSuggestions);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setActiveField("city");
    fetchSuggestions(e.target.value, setCitySuggestions);
  };

  const handleSuggestionClick = (suggestion, setValue, setSuggestions) => {
    setValue(suggestion);
    setSuggestions([]); // Clear suggestions after selection
    setActiveField(""); // Reset active field
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={fullAddress}
          onChange={handleFullAddressChange}
          placeholder="Enter full address"
        />
        {activeField === "fullAddress" && (
          <ul>
            {addressSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() =>
                  handleSuggestionClick(suggestion, setFullAddress, setAddressSuggestions)
                }
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <input
          type="text"
          value={state}
          onChange={handleStateChange}
          placeholder="Enter state"
        />
        {activeField === "state" && (
          <ul>
            {stateSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() =>
                  handleSuggestionClick(suggestion, setState, setStateSuggestions)
                }
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        {activeField === "city" && (
          <ul>
            {citySuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() =>
                  handleSuggestionClick(suggestion, setCity, setCitySuggestions)
                }
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Test;
