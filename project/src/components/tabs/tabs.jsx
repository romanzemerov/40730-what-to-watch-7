import React, { useState } from 'react';
import { Tab } from './components/tab/tab';
import PropTypes from 'prop-types';

const getTabsList = (children) =>
  children.map((child) => ({
    id: child.key,
    label: child.props.label,
  }));

function Tabs({ children }) {
  const [tabs] = useState(() => getTabsList(React.Children.toArray(children)));
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  const tabClickHandler = (id) => {
    if (activeTabId === id) {
      return;
    }

    setActiveTabId(id);
  };

  const getTabContent = () => {
    const tabElement = React.Children.toArray(children).find(
      ({ key }) => key === activeTabId,
    );

    return tabElement.props.children;
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {tabs.map(({ id, label }) => {
            const isActive = id === activeTabId;

            return (
              <Tab
                key={id}
                id={id}
                isActive={isActive}
                label={label}
                onClick={tabClickHandler}
              />
            );
          })}
        </ul>
      </nav>

      {getTabContent()}
    </>
  );
}

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Tabs };
