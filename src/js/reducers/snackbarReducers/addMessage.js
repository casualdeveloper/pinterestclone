export const addMessage = (state, action) => {
    let newMessage = action.payload;
    let messageStack = state.messageStack.slice(0);
    messageStack.push(newMessage);

    return {
        messageStack
    }
}