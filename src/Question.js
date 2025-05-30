function Question({ data, answer, onAnswer }) {
  const { question, type, choices } = data;

  return (
    <div>
      <h3>{question}</h3>
      {type === "multiple" && choices.map(choice => (
        <label key={choice.id}>
          <input
            type="radio"
            name={`q-${data.id}`}
            value={choice.id}
            checked={answer === choice.id}
            onChange={() => onAnswer(choice.id)}
          />
          {choice.value}
        </label>
      ))}
      {type === "binary" && (
        <>
          <label>
            <input
              type="radio"
              name={`q-${data.id}`}
              value="true"
              checked={answer === "true"}
              onChange={() => onAnswer("true")}
            /> True
          </label>
          <label>
            <input
              type="radio"
              name={`q-${data.id}`}
              value="false"
              checked={answer === "false"}
              onChange={() => onAnswer("false")}
            /> False
          </label>
        </>
      )}
      {type === "identification" && (
        <input
          type="text"
          value={answer || ""}
          onChange={e => onAnswer(e.target.value)}
        />
      )}
    </div>
  );
}

export default Question;