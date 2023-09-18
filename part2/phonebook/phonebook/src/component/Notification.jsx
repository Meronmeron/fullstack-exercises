const Notification = ({ message,isSuccess }) => {
    if (message === null) {
      return null
    }
    const notificationStyle = {
        color: isSuccess?'green':'red',
        backgroundColor: 'lightgrey',
        fontSize: 20,
        padding: 10,
        borderStyle: 'solid',
        marginBotton: 10,
        textAlign: 'center'
    }

    return (
      <div style={notificationStyle }>
        {message}
      </div>
    )
  }

  export default Notification;