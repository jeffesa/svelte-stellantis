import Accordions from './Accordions.svelte'
import AccordionNav from './AccordionNav.svelte'
import AccordionButton from './AccordionButton.svelte'
import AccordionContent from './AccordionContent.svelte'
import AccordionFeature from './AccordionFeature.svelte'

Accordions.Nav = AccordionNav
Accordions.Button = AccordionButton
Accordions.Content = AccordionContent
Accordions.Feature = AccordionFeature

export default Accordions

export { 
  AccordionNav, 
  AccordionButton, 
  AccordionContent,
  AccordionFeature,
}
