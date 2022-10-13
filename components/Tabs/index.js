import Tabs from './Tabs.svelte'
import TabNav from './TabNav.svelte'
import TabButton from './TabButton.svelte'
import TabControl from './TabControl.svelte'
import TabContent from './TabContent.svelte'

Tabs.Nav = TabNav
Tabs.Button = TabButton
Tabs.Control = TabControl
Tabs.Content = TabContent

export default Tabs

export { TabNav, TabButton, TabControl, TabContent }
