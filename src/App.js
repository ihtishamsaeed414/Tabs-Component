import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        {/* why not put key props here to improve performance
        it is becuase diffing alogorithm applies to same position eleement in the tree no different poistions and also the tabs has there own structure at instance in tree unlike tabContent that is only one instance and is used again and again on the same position */}
        {/* or it 4:35 in 131 it is stated that same elements on different positions result dom to destroye and reacreat if new element is added so it is good
        to put keys here for performance but it maybe noticable only on large applications */}
        {/* the belwo tabs can be generated by array.from also */}
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        // here i need to put the key prop becuase react see the component as same position same eleemnt and component is kept in the dom
        // however i will give so that react differentiate between components and destryed the provious component so that state is reset(when i click on hide it hide for all three tab no matter i shiped around tabs so i dont want this behaviour)
        // giving key props make it according to other rule as same postion different elemeent the component will be re-renders with its childs.
        <TabContent
          item={content.at(activeTab)}
          // key props here is required becuase react will know that this time the component is differebt hence it will detroy the previous one and commit the new one with new states
          key={content.at(activeTab).summary}
        />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes(likes + 1);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        {/* the h below take the current value of the state that is true in this case */}
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}

//  folowing diffing rules, when i am at tab 1 and increase the heart to 10 and then go to other tab the state is preserved and kept not destroyed but only props changed(as in rule), when i go to the tab4 a complete different eleemnt is wiredup in the fiber tree as a result the previous tab1 or 2 or 3 is destroyed hence the state is reseted.
function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}
