import { Component } from "solid-js";
import { Link } from "@solidjs/router";
import LegalLayout from "~/layouts/LegalLayout";

const DeliveryPolicy: Component = () => {
  return (
    <LegalLayout title="Delivery/Shipping Policy" revisionDateTime="2022-10-12 14:45:08">
      <h3 id="international-shipping-and-delivery-estimates">International Shipping and Delivery Estimates</h3>
      <ul>
        <li>
          Upon Order Placement, you will receive an Order Acknowledgement email to confirm your order details. Once your item ships, you will receive a Shipment Confirmation email.
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th role="columnheader" >Shipping method</th>
                  <th role="columnheader" >Delivers In</th>
                  <th role="columnheader" >Shipping cost if order total is less than US$79</th>
                  <th role="columnheader" >Shipping cost if order total is more than US$79</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td role="rowheader" >Standard</td>
                  <td>5 - 7 Business Days</td>
                  <td>$10</td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td role="rowheader">Express</td>
                  <td>3 - 5 Business Days</td>
                  <td>$20</td>
                  <td>$10</td>
                </tr>
                <tr>
                  <td role="rowheader">Priority</td>
                  <td>2 - 3 Business Days</td>
                  <td>$25</td>
                  <td>$15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
      </ul>

      Note: Orders on international shipment may be delayed due to customs controls.
      <br /><br />
      <ol>
        <li>All estimates are based on business days.</li>
        <li>The 'Delivers In' timeframe is an estimate of when the item will be delivered to your shipping address after it ships.</li>
        <li>If your item is backordered or pre-ordered, we will estimate your item’s shipping date before you place your order. If you chose to pay by credit card, we will be charging you upfront.</li>
        <li>If you have ordered multiple items that are ready to ship on different dates, you may receive separate shipments.</li>
        <li>Depending on shipment and delivery conditions, your order may ship when all items are ready to ship.</li>
        <li>Unexpected service delays (e.g., weather conditions, natural disasters, or unforeseen events) may add at least 2 to 3 business days to your estimated delivery date.</li>
        <li>Choosing a higher quantity for an item may make it ineligible for immediate shipping when the item is unavailable locally or at the same location. In this case, the One-Day Delivery option may not appear.</li>
        <li>Domestic shipment only applies to selected items in Hong Kong, United States, and EU locales Only.</li>
      </ol>


      <h3 id="shipping-destinations">Shipping Destinations</h3>
      <ul>
        <li>There are more than 30 countries where RentAKloud.com ships to. We do not ship to freight forwarders. Please see our <a href="//www.rentakloud.com/choose-country-region" class="link">International Store Directory</a> to find out if RentAKloud.com serves your country.</li>
      </ul>

      <h3 id="free-shipping-eligibility" >Free Shipping Eligibility</h3>
      <ul>
        <li>By default, free shipping will be offered on cart value above US$79 for orders fulfilled and shipped by Rentakloud.com (excluding bulk orders, gift redemptions, and oversized items). This minimum spend is lowered during promotional periods for greater eligibility. Offer only applies to shipping fees and does not include customs and handling fees where applicable. Offer is subject to change without notice.</li>
      </ul>

      <h3 id="undelivered-packages" >Undelivered Packages</h3>
      <ul>
        <li>When the carrier returns an undeliverable package to us, a full refund inclusive of shipping charges is issued. To purchase items that were undeliverable, a new order will have to be placed. Please make sure your address is correct before confirming your order. If making a purchase for someone else as a gift, it is recommended to notify them about the impending delivery to minimize confusion which might lead to a refusal of the package.</li>
      </ul>

      <h3 id="click-and-collect" >Click and Collect</h3>
      <ul>
        <li>At checkout, Click and Collect will be reflected as a choice of shipping method (subject to item availability). </li>
      </ul>

      <h3 id="track-your-order" >Track Your Order</h3>
      <ul>
        <li>Log in with your RentAKloud ID and password to get a summary of past orders. You'll see your order number, the date, and time the order was placed, the status of the order, and package tracking information for items that have shipped. You can visit our online Order Status 24 hours a day, 7 days a week, to view the most up-to-date status of your order. <br /><br />
          To track your order:
          <ol>
            <li>Go to your <a href="https://www.rentakloud.com/my-account/orders" class="link">Order History</a> to select your order.</li>
            <li>Go to “Delivery Method” to view your shipment delivery information.</li>
            <li>If your order has shipped, you will see Track Shipment and this links to your shipment delivery details including the estimated order delivery date.</li>
          </ol>
        </li>
      </ul>

      <h3 id="returns-and-cancellations">RETURNS AND CANCELLATIONS</h3>
      <ul>
        <li>Orders for in-stock items are sent to our warehouse for shipping immediately after you place the order, and your payment processing is complete.
          <br /><br />
          <ol>
            <li>To request a cancellation:
              <ul>
                <li>1.1. If your order has been submitted less than 2 hours ago, Login to <a href="https://www.rentakloud.com/my-account/orders" class="link">My Orders</a>, and click the Cancel My Order button. </li><li >1.2. If you are no longer able to see the Cancel My Order button, you will have to contact <a href="https://support.rentakloud.com/contact-support" class="link">Customer Support</a> for a Return Merchandise Authorization (RMA).</li>
              </ul>
            </li>
            <li>If you're dissatisfied with an item you have received, you may:
              <ul>
                <li>2.1. Contact <a href="https://support.rentakloud.com/contact-support" class="link">Customer Support</a> for a Return Merchandise Authorization (RMA).</li>
              </ul>
            </li>
          </ol>
          For details on items eligible for return, how to process a return, and refund information, see <Link href="/legal/refund-policy" class="link">Returns and Refunds</Link>.</li>
      </ul>
    </LegalLayout>
  );
};

export default DeliveryPolicy;


