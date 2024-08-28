// export const isSameSenderMargin = (messages, m, i, userId) => {
//     // console.log(i === messages.length - 1);
  
//     if (
//       i < messages.length - 1 &&
//       messages[i + 1].sender._id === m.sender._id &&
//       messages[i].sender._id !== userId
//     )
//       return 33;
//     else if (
//       (i < messages.length - 1 &&
//         messages[i + 1].sender._id !== m.sender._id &&
//         messages[i].sender._id !== userId) ||
//       (i === messages.length - 1 && messages[i].sender._id !== userId)
//     )
//       return 0;
//     else return "auto";
//   };
  
//   export const isSameSender = (messages, m, i, userId) => {
//     return (
//       i < messages.length - 1 &&
//       (messages[i + 1].sender._id !== m.sender._id ||
//         messages[i + 1].sender._id === undefined) &&
//       messages[i].sender._id !== userId
//     );
//   };
  
//   export const isLastMessage = (messages, i, userId) => {
//     return (
//       i === messages.length - 1 &&
//       messages[messages.length - 1].sender._id !== userId &&
//       messages[messages.length - 1].sender._id
//     );
//   };
  
//   export const isSameUser = (messages, m, i) => {
//     return i > 0 && messages[i - 1].sender._id === m.sender._id;
//   };
  

export const isSameSenderMargin = (messages, m, i, userId) => {
  // Check if the index is valid and messages exist
  if (i >= messages.length) {
    return "auto";
  }

  // Get the next message and its sender
  const nextMessage = messages[i + 1];
  const nextMessageSender = nextMessage ? nextMessage.sender : null;

  // Get the current message's sender
  const currentMessageSender = m.sender;

  // Check for undefined or null values
  if (!currentMessageSender || !currentMessageSender._id) {
    return "auto";
  }

  // Determine margin based on the sender of the next message and the current message
  if (
    i < messages.length - 1 &&
    nextMessageSender &&
    nextMessageSender._id === currentMessageSender._id &&
    currentMessageSender._id !== userId
  ) {
    return 33;
  } else if (
    (i < messages.length - 1 &&
      nextMessageSender &&
      nextMessageSender._id !== currentMessageSender._id &&
      currentMessageSender._id !== userId) ||
    (i === messages.length - 1 && currentMessageSender._id !== userId)
  ) {
    return 0;
  } else {
    return "auto";
  }
};

export const isSameSender = (messages, m, i, userId) => {
  // Check if the index is valid and messages exist
  if (i >= messages.length - 1 || !messages[i + 1]) {
    return false;
  }

  // Get the next message and its sender
  const nextMessage = messages[i + 1];
  const nextMessageSender = nextMessage.sender;
  
  // Get the current message's sender
  const currentMessageSender = m.sender;

  // Check for undefined or null values
  if (!currentMessageSender || !currentMessageSender._id) {
    return false;
  }

  // Check if the next message's sender exists and is different from the current message's sender
  const isNextSenderDifferent = nextMessageSender && nextMessageSender._id !== currentMessageSender._id;

  // Determine if the current message is from the same sender as the next message
  return (
    i < messages.length - 1 &&
    isNextSenderDifferent &&
    currentMessageSender._id !== userId
  );
};


export const isLastMessage = (messages, i, userId) => {
  // Check if the index is valid and messages exist
  if (i >= messages.length) {
    return false;
  }

  // Get the last message and its sender
  const lastMessage = messages[messages.length - 1];
  const lastMessageSender = lastMessage ? lastMessage.sender : null;

  // Get the current message's sender
  const currentMessageSender = messages[i].sender;

  // Check for undefined or null values
  if (!lastMessageSender || !lastMessageSender._id || !currentMessageSender || !currentMessageSender._id) {
    return false;
  }

  // Determine if the current message is the last message and is from the same sender
  return (
    i === messages.length - 1 &&
    lastMessageSender._id !== userId &&
    lastMessageSender._id === currentMessageSender._id
  );
};

export const isSameUser = (messages, m, i) => {
  // Check if the index is valid and messages exist
  if (i <= 0 || i >= messages.length) {
    return false;
  }

  // Get the previous message and its sender
  const previousMessage = messages[i - 1];
  const previousMessageSender = previousMessage ? previousMessage.sender : null;

  // Get the current message's sender
  const currentMessageSender = m.sender;

  // Check for undefined or null values
  if (!currentMessageSender || !currentMessageSender._id || !previousMessageSender || !previousMessageSender._id) {
    return false;
  }

  // Determine if the current message is from the same sender as the previous message
  return previousMessageSender._id === currentMessageSender._id;
};


  export const getSender = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
  };
  
  export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };