import React from "react";
import { IonCard, IonCardContent, IonCardTitle, IonContent, IonLabel, IonPage } from "@ionic/react";
import HeaderComponent from "../../components/headersFooters/HeaderComponent";
import FooterComponent from "../../components/headersFooters/FooterComponent";

export default function About() {
  return (
    <IonPage>
      <IonContent>
        <HeaderComponent title='About' showBanner={true} />

        <IonCard color='light'>
          <IonCardContent>
            <IonLabel class='ion-text-wrap'>
              We are a small (but not limited) company that started playing in the manufacturing and printing industry in 2019. We started with only websites & have expanded to new lines in
              the past few months and we strive to bring you even more in the coming months & years.
            </IonLabel>
            <br />
            <br />
            <IonLabel class='ion-text-wrap'>
              We are a small (but not limited) company that started playing in the manufacturing and printing industry in 2019. We started with only baby websites and facebook marketing and
              have expanded to new lines in the past few months and we strive to bring you even more in the coming months & years. We want to make it easy for you to use our products in your
              business, should it be for branding, stores or your own brand. With our garments we do custom branding. Our clothing makes it easy for you to do whatever you want with them. We
              also have a NO MIN ORDER QTY, thus making it easy for you to purchase on a low scale and for the guys wanting to go on a large scale, we do offer a 10% discount on qty’s of
              50+. This discount is subject to certain items only (please email us with your requirements) We are a proudly South-African company, based in George, Western Cape . We work
              mostly online and offer various delivery methods across South-Africa. All our clothing and products are manufactured in-house. We have NO MIN order qty and our items are made
              from 100% cotton with our melange colours being Poly/cotton. We strive to bring you quality products & good service. We value each customer and we hope that we can become
              business partners, not only now but for years to come.
            </IonLabel>
            <br />
            <br />

            <IonCardTitle>Our Mission, Vision and Values</IonCardTitle>

            <br />
            <IonCardTitle>Mission</IonCardTitle>
            <br />
            <IonLabel class='ion-text-wrap'>
              We deliver creative Print & Manufacturing Solutions that make our clients successful. We keep our promises, provide creative solutions, and achieve our client’s goals.
            </IonLabel>
            <br />
            <br />
            <IonCardTitle>Vision</IonCardTitle>
            <br />
            <IonLabel class='ion-text-wrap'>
              To become George's most recognized and trusted Print & Manufacturing Solutions provider. <br />
              We will use our God given talents to become widely recognized for our innovation, client loyalty and unwavering integrity. We build our business by challenging the traditional
              norms of print and manufacturing. We will provide fresh ideas and creative solutions for our clients, earning the privilege to be their trusted advisor.
            </IonLabel>
            <br />
            <br />

            <IonCardTitle>Values</IonCardTitle>
            <br />
            <IonLabel class='ion-text-wrap'>
              Putting people first… Operating with Integrity… Giving Back. <br />
              Webfusiononline PTY Ltd philosophy of treating others as we desire to be treated is our Golden Rule of Operations (Matthew 7:12). <br />
              People First. We value all people treating them fairly, respectfully and in accordance with the Golden Rule.
              <br />
              Client Focus. We seek to make customers successful by understanding their needs and challenges, treating them as our business partners.
              <br />
              Embracing Change. We understand that we must continually adapt to the ever changing needs of the marketplace.
              <br />
              Giving. We actively contribute to the well-being of our local and global communities, seeking to strengthen families and those in need around us by cheerfully sharing a portion
              of what God has provided to us.
              <br />
              Our Team. Our team is different and that makes us great. Their combined knowledge and talents make Webfusiononline and #PrettyThings a valuable partner in business. We seek who
              compliment and enhance our skill set.
              <br />
            </IonLabel>
            <br />
            <br />
            <IonCardTitle>How Do We Achieve This Mission?</IonCardTitle>
            <br />
            <IonLabel class='ion-text-wrap'>
              We are in the business of printing and manufacturing. However, we feel that our company produces something much larger than ink and toner on paper. We help craft your ideas,
              hopes, and dreams. We take pride in the fact that the items we create help tell your story and make your business more successful. We make every effort to be successful, but we
              recognize that we can only accomplish this if we can help you be successful.
            </IonLabel>
          </IonCardContent>
        </IonCard>

        <FooterComponent />
      </IonContent>
    </IonPage>
  );
}
