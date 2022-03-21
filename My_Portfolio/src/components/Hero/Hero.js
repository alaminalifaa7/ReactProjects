import React from "react";

import {
  Section,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import Button from "../../styles/GlobalComponents/Button";
import { LeftSection } from "./HeroStyles";

const Hero = (props) => (
  <Section row nopadding>
    <LeftSection>
      <SectionTitle main center>
        Hi, This is <br />
        Al Amin Alif.
      </SectionTitle>
      <SectionText>
        I'm a Full-Stack Software Engineer with a focus on the MERN stack, but
        still exploring other technologies and frameworks that catch my
        interest! if you're looking for a developer to add to your team, I'd
        love to hear from you.
      </SectionText>
      <Button onClick={() => (window.location = "#")}>Learn More</Button>
    </LeftSection>
  </Section>
);

export default Hero;
