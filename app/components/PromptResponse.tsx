/**
 *  This is the propmpt response form the LLM model
 *  The response if formated in a way that looks appealing to the user
 *
 */

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  messages: Message[];
  isLoading: boolean;
};

const PromptResponse = ({ messages, isLoading }: Props) => {
  console.log(messages);
  return (
    <div className="h-auto flex flex-col flex-auto w-full p-8 space-y-4">
      {messages.length === 0 ? (
        <p className="text-gray-500">
          Hello, I'm your Travel Assistant. How can I help you today?
        </p>
      ) : (
        messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              message.role === "user"
                ? "bg-blue-100 text-blue-900 self-end max-w-[80%]"
                : "bg-gray-100 text-gray-900 self-start max-w-[80%]"
            }`}
          >
            {message?.content &&
              message.content
                .replace(/\*\*(.+?)\*\*:\s*/, "**$1**\n")
                .split("\n")
                .map((line, i) => {
                  const isLabelLine = line.match(/^\*\*(.+?)\*\*:/);

                  if (isLabelLine) {
                    return (
                      <p key={i} className="text-sm font-semibold">
                        <strong>
                          {isLabelLine[1].replace(/\*\*(.+?)\*\*/, "\t**$1**")}
                        </strong>
                        :
                      </p>
                    );
                  }

                  return (
                    <p
                      key={i}
                      className="text-sm"
                      dangerouslySetInnerHTML={{
                        __html: line.replace(
                          /\*\*(.+?)\*\*/g,
                          "<strong>$1</strong>",
                        ),
                      }}
                    />
                  );
                })}
          </div>
        ))
      )}
      {isLoading && (
        <div className="p-4 bg-gray-100 mr-auto max-w-[80%] rounded-md">
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default PromptResponse;
