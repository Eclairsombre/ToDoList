import React, { useState } from "react";

export default function TaskForm({ onAdd }) {
    const [taskName, setTaskName] = useState("");

    function handleSubmit(e) {
      e.preventDefault();
      if (!taskName) return;
      if (onAdd) {
        onAdd(taskName);
      }
      setTaskName("");
    }
  return (
    <form onSubmit={handleSubmit}>
      <button> + </button>
      <input
        type="text"
        value={taskName}
        placeholder="Add a new task"
        onChange={(e) => setTaskName(e.target.value)}
      />
    </form>
  );
}