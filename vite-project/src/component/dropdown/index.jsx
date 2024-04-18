import Select from 'react-select';
import './index.css'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

/**
 * Componente de Dropdown em react
 * 
 * @param {useState} selectedOption - um argumento do tipo useState
 * @param {useState} setSelectedOption - um argumento do tipo useState Set
 * @param {Array} options - um argumento contendo todas as opões do dropdown
 */
const Dropdown = ({ selectedOption, setSelectedOption, options, placeholder }) => {

  return (
    <div className="dropdown">
      <Select
        placeholder={placeholder}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
}
export default Dropdown