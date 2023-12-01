import { MenuProps } from './Menu.types';
import { Box } from './Menu.styles';

const Menu = (props: MenuProps) => {
  const { list, $top } = props;

  return (
    <Box $top={$top}>
      {list.map((e, i) => {
        return (
          <li key={i + e.name} onClick={e.onClick}>
            {e.name}
          </li>
        );
      })}
    </Box>
  );
};

export default Menu;
