const Notification = ({ message, notificationType }) => {
  if (!message) return null

  if (notificationType === "error")
    return <div className="error">{message}</div>
  else return <div className="success">{message}</div>
}

export default Notification
