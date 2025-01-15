import { AIConversation } from "@aws-amplify/ui-react-ai";
import { Authenticator } from "@aws-amplify/ui-react";
import { Card, View, Flex, Heading, Divider, Avatar, Button } from "@aws-amplify/ui-react"; 
import { useAIConversation } from "./client";
import "./App.css";

function App() {
  const [
    {
      data: { messages },
      isLoading,
    },
    handleSendMessage,
  ] = useAIConversation("chat");

  function Header ({ signOut }: any) {
    return (
      <View 
        position="fixed"
        width="100%"
        backgroundColor="white"
        top="0"
        left="0"
        padding="2rem"
      >
        <Flex
          direction="row"
          justifyContent="space-between"
        >
          <Heading level={3}>Amplify AI Kit Chat アプリ</Heading>
          <Button
            variation="link"
            onClick={signOut}
          >
            Sign out
          </Button>
        </Flex>
        <Divider/>
    </View>
    )
  }

  function WellcomeMessageCard () {
    return (
      <Card>
        <Heading level={2}>こんにちは！私はAmplify Assistantです。</Heading>
      </Card>
    )
  }

  return (
    <Authenticator>
      {({ signOut }) => (
        <Card width="100%" height="100%" display="flex" style={{ justifyContent: "center" }}>
          <Header signOut={signOut} />
          <AIConversation
            messages={messages}
            isLoading={isLoading}
            handleSendMessage={handleSendMessage}
            welcomeMessage={
              <WellcomeMessageCard/>
            }
            displayText={{
              getMessageTimestampText: (date) => new Intl.DateTimeFormat('ja-JP', {
                dateStyle: 'full',
                timeStyle: 'short',
                hour12: true,
                timeZone: 'Asia/Tokyo'
              }).format(date)
            }}
            avatars={{
              user: {
                avatar: <Avatar src="/man_icon.jpg" />,
                username: "あなた",
              },
              ai: {
                avatar: <Avatar src="/ai_icon.jpg" />,
                username: "AI"
              }
            }}
          />
        </Card>
    )}

    </Authenticator>
  )
}

export default App
