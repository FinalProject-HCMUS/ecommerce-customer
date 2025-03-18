const QuantityControl = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-full">
      <button
        onClick={onDecrease}
        className="w-8 h-8 flex items-center justify-center rounded-l-full hover:bg-gray-100"
      >
        −
      </button>
      <span className="w-8 text-center">{quantity}</span>
      <button
        onClick={onIncrease}
        className="w-8 h-8 flex items-center justify-center rounded-r-full hover:bg-gray-100"
      >
        +
      </button>
    </div>
  )
}

export default QuantityControl

