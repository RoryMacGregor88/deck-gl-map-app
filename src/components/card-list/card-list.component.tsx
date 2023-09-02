const SidebarList = ({ data }) => (
  <ul>
    {data.features.slice(0, 10).map(({ properties }) => (
      <li>
        <ul>
          {Object.entries(properties).map(([key, value]) => (
            <li>
              {key}: {value}
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

export default SidebarList;
