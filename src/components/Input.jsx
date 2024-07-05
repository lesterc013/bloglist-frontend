const Input = ({ type, name, value, onChange }) => {
  return (
    <div>
      {name}:
      <input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input