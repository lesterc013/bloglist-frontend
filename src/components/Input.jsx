const Input = ({ type, name, value, onChange }) => {
  return (
    <div>
      {name}:
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        data-testid={name}
      />
    </div>
  )
}

export default Input
