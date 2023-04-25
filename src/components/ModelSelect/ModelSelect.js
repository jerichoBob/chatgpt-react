import React from 'react';
import Select from 'react-select';

const ModelSelect = ({ models, selectedModel, setSelectedModel }) => {
  const handleChange = (selectedOption) => {
    setSelectedModel(selectedOption);
  };

  return (
    <Select
      value={selectedModel}
      onChange={handleChange}
      options={models}
      className="model-select"
    />
  );
};

export default ModelSelect;
