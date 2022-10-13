import Menu from './Menu.svelte'
import Header from './Header.svelte'
import Nav from './Nav.svelte'
import Link from './Link.svelte'
import Divider from './Divider.svelte'
import Toggle from './Toggle.svelte'

Menu.Header = Header
Menu.Nav = Nav
Menu.Link = Link
Menu.Divider = Divider
Menu.Toggle = Toggle

export default Menu

export { Menu, Header, Nav, Link, Divider, Toggle }
