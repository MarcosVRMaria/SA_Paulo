import Select from 'react-select';
import './index.css'



/**
 * Componente de Dropdown em react
 * 
 * @param {useState} selectedOption - um argumento do tipo useState
 * @param {useState} setSelectedOption - um argumento do tipo useState Set
 * @param {Array} options - um argumento contendo todas as opões do dropdown
 */

const Dropdown = ({ selectedOption, setSelectOption, options, placeholder }) => {

  const handleTypeSelect = (e) => {
    setSelectOption(e.value);
  };
  // Estilos personalizados para o Select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '10px', 
      borderColor:"black",
      // Ajuste conforme necessário
    }),
  };
  return (
    <div className="dropdown">
      <Select
        styles={customStyles} placeholder={placeholder}
        defaultValue={selectedOption}
        onChange={handleTypeSelect}
        options={options}
      // value={options.filter(function (option) {
      //   return option.value === selectedOption;
      // })}
      />
    </div>
  );
}
export default Dropdown