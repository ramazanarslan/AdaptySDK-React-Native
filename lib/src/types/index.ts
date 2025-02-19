// import SDK type to link to methods in docs.
import { Adapty } from '../sdk/adapty';

export const VendorStore = Object.freeze({
  AppStore: 'app_store',
  PlayStore: 'play_store',
  Adapty: 'adapty',
});
export type VendorStore = typeof VendorStore[keyof typeof VendorStore];

export const OfferType = Object.freeze({
  FreeTrial: 'free_trial',
  PayAsYouGo: 'pay_as_you_go',
  PayUpFront: 'pay_up_front',
});
export type OfferType = typeof OfferType[keyof typeof OfferType];

export const CancellationReason = Object.freeze({
  VolountarilyCancelled: 'voluntarily_cancelled',
  BillingError: 'billing_error',
  Refund: 'refund',
  PriceIncrease: 'price_increase',
  ProductWasNotAvailable: 'product_was_not_available',
  Unknown: 'unknown',
});
export type CancellationReason =
  typeof CancellationReason[keyof typeof CancellationReason];

export const Gender = Object.freeze({
  Female: 'f',
  Male: 'm',
  Other: 'o',
});
export type Gender = typeof Gender[keyof typeof Gender];

export const AppTrackingTransparencyStatus = Object.freeze({
  NotDetermined: 'not_determined',
  Restricted: 'restricted',
  Denied: 'denied',
  Authorized: 'authorized',
  Unknown: 'unknown',
});
export type AppTrackingTransparencyStatus =
  typeof AppTrackingTransparencyStatus[keyof typeof AppTrackingTransparencyStatus];

export const ProductPeriod = Object.freeze({
  Day: 'day',
  Week: 'week',
  Month: 'month',
  Year: 'year',
});
export type ProductPeriod = typeof ProductPeriod[keyof typeof ProductPeriod];

export const OfferEligibility = Object.freeze({
  Eligible: 'eligible',
  Ineligible: 'ineligible',
  Unknown: 'unknown',
});
export type OfferEligibility =
  typeof OfferEligibility[keyof typeof OfferEligibility];

/**
 * Describes an object that represents a paywall.
 * Used in {@link Adapty.getPaywall} method.
 * @public
 */
export interface AdaptyPaywall {
  /**
   * Parent A/B test name.
   * @readonly
   */
  readonly abTestName: string;
  /**
   * ID of a paywall configured in Adapty Dashboard.
   * @readonly
   */
  readonly id: string;
  /**
   * Identifier of a paywall locale.
   * @readonly
   */
  readonly locale: string;
  /**
   * A paywall name.
   * @readonly
   */
  readonly name?: string;
  /**
   * A custom dictionary configured in Adapty Dashboard for this paywall.
   * @readonly
   */
  readonly remoteConfig?: Record<string, any>;
  /**
   * A custom JSON string configured in Adapty Dashboard for this paywall.
   * @readonly
   */
  readonly remoteConfigString?: string;
  /**
   * Current revision (version) of a paywall.
   * Every change within a paywall creates a new revision.
   * @readonly
   */
  readonly revision: number;
  /**
   * An identifier of a variation,
   * used to attribute purchases to this paywall.
   * @readonly
   */
  readonly variationId: string;
  /**
   * Array of related products ids.
   * @readonly
   */
  readonly vendorProductIds?: string[];
}

/**
 * Describes an object that represents a user profile,
 * including subscriptions and consumables.
 * @public
 */
export interface AdaptyProfile {
  /**
   * The keys are access level identifiers configured by you in Adapty Dashboard.
   * The values can be `null` if the customer has no access levels.
   * @readonly
   */
  readonly accessLevels?: Record<string, AdaptyAccessLevel>;
  /**
   * Previously set user custom attributes with {@link Adapty.updateProfile} method.
   * @readonly
   */
  readonly customAttributes: Partial<AdaptyProfileParameters>;
  /**
   * An identifier of a user in your system.
   * @readonly
   */
  readonly customerUserId?: string;
  /**
   * The keys are product ids from the store.
   * The values are arrays of information about consumables.
   * Can be `null` if the customer has no purchases.
   * @readonly
   */
  readonly nonSubscriptions?: Record<string, AdaptyNonSubscription[]>;
  /**
   * An identifier of a user in Adapty.
   */
  readonly profileId: string;
  /**
   * The keys are product ids from a store.
   * The values are information about subscriptions.
   * Can be `null` if the customer has no subscriptions.
   * @readonly
   */
  readonly subscriptions?: Record<string, AdaptySubscription>;
}

/**
 * Current user's access level information.
 * @public
 */
export interface AdaptyAccessLevel {
  /**
   * Time when this access level was activated.
   * @readonly
   */
  readonly activatedAt: Date;
  /**
   * A type of an active introductory offer.
   * If the value is not `null`,
   * it means that the offer was applied during the current subscription period.
   * @readonly
   */
  readonly activeIntroductoryOfferType?: OfferType;
  /**
   * An id of active promotional offer.
   * @readonly
   */
  readonly activePromotionalOfferId?: string;
  /**
   *  A type of an active promotional offer.
   * If the value is not `null`,
   * it means that the offer was applied
   * during the current subscription period.
   * @readonly
   */
  readonly activePromotionalOfferType?: OfferType;
  /**
   * Time when billing issue was detected.
   * Subscription can still be active.
   * Would be set to `null` if a charge is made.
   * @readonly
   */
  readonly billingIssueDetectedAt?: Date;
  /**
   * A reason why a subscription was cancelled.
   * @readonly
   */
  readonly cancellationReason?: CancellationReason;
  /**
   * Time when the access level will expire.
   * Could be in the past and could be `null` for lifetime access.
   * @readonly
   */
  readonly expiresAt?: Date;
  /**
   * Unique identifier of the access level
   * configured by you in Adapty Dashboard.
   * @readonly
   */
  readonly id: string;
  /**
   * `true` if this access level is active.
   * Generally, you can check this property to determine
   * whether a user has an access to premium features.
   * @readonly
   */
  readonly isActive: boolean;
  /**
   * `true` if this auto-renewable subscription is in the grace period.
   * @readonly
   */
  readonly isInGracePeriod: boolean;
  /**
   * `true` if this access level is active for a lifetime (no expiration date).
   * @readonly
   */
  readonly isLifetime: boolean;
  /**
   * `true` if this purchase was refunded
   * @readonly
   */
  readonly isRefund: boolean;
  /**
   * Time when the access level was renewed.
   * It can be null if the purchase was first in chain
   *  or it is non-renewing subscription / non-consumable (e.g. lifetime)
   * @readonly
   */
  readonly renewedAt?: Date;
  /**
   * Time when this access level has started.
   * Could be in the future.
   * @readonly
   */
  readonly startsAt?: Date;
  /**
   * A store of the purchase that unlocked this access level.
   * @readonly
   */
  readonly store: VendorStore;
  /**
   * Time when the auto-renewable subscription was cancelled.
   * Subscription can still be active,
   * it just means that auto-renewal turned off.
   * Will be set to `null` if the user reactivates the subscription.
   * @readonly
   */
  readonly unsubscribedAt?: Date;
  /**
   * An identifier of a product in a store that unlocked this access level.
   * @readonly
   */
  readonly vendorProductId: string;
  /**
   * `true` if this auto-renewable subscription is set to renew.
   * @readonly
   */
  readonly willRenew: boolean;
}

/**
 * Current user's consumable/non-subscription purchase.
 * @public
 */
export interface AdaptyNonSubscription {
  /**
   * `true` if the product should only be processed once
   * (e.g. consumable purchase)
   * @readonly
   */
  readonly isOneTime: boolean;
  /**
   * true if the purchase was refunded.
   */
  readonly isRefund: boolean;
  /**
   * `true` if the product was purchased in sandbox environment
   * @readonly
   */
  readonly isSandbox: boolean;
  /**
   * An identifier of the purchase in Adapty.
   * You can use it to ensure that you’ve already processed this purchase
   * (for example tracking one time products).
   * @readonly
   */
  readonly purchaseId: string;
  /**
   * Date when the product was purchased.
   * @readonly
   */
  readonly purchasedAt: Date;
  /**
   * A store of the purchase
   * @readonly
   */
  readonly store: VendorStore;
  /**
   * An identifier of a product in a store
   * that unlocked this subscription.
   * @readonly
   */
  readonly vendorProductId: String;
  /**
   * A transaction id of a purchase in a store
   * that unlocked this subscription.
   * @readonly
   */
  readonly vendorTransactionId?: string;
}

/**
 * Current user's subscription purchase.
 * @public
 */
export interface AdaptySubscription {
  /**
   * Time when the subscription was activated.
   * @readonly
   */
  readonly activatedAt: Date;
  /**
   * A type of an active introductory offer.
   * If the value is not `null`,
   * it means that the offer was applied during the current subscription period.
   * @readonly
   */
  readonly activeIntroductoryOfferType?: OfferType;
  /**
   * An id of active promotional offer.
   * @readonly
   */
  readonly activePromotionalOfferId?: string;
  /**
   * A type of an active promotional offer.
   * If the value is not `null`,
   * it means that the offer was applied during the current subscription period.
   * @readonly
   */
  readonly activePromotionalOfferType?: OfferType;
  /**
   * Time when a billing issue was detected. Subscription can still be active.
   * @readonly
   */
  readonly billingIssueDetectedAt?: Date;
  /**
   * A reason why a subscription was cancelled.
   * @readonly
   */
  readonly cancellationReason?: CancellationReason;
  /**
   * Time when the access level will expire.
   * Could be in the past and could be `null` for lifetime access.
   * @readonly
   */
  readonly expiresAt?: Date;
  /**
   * `true` if this subscription is active
   * @readonly
   */
  readonly isActive: boolean;
  /**
   * `true` if auto renewable subscription is in grace period
   * @readonly
   */
  readonly isInGracePeriod: boolean;
  /**
   * `true` if the subscription is active for lifetime
   * (no expiration date).
   */
  readonly isLifetime: boolean;
  /**
   * `true` if the purchase was refunded
   * @readonly
   */
  readonly isRefund: boolean;
  /**
   * `true` if the product was purchased in sandbox enviroment
   * @readonly
   */
  readonly isSandbox: boolean;
  /**
   * Time when the subscription was renewed.
   * It can be `null` if the purchase was first in chain
   * or it is non-renewing subscription.
   * @readonly
   */
  readonly renewedAt?: Date;
  /**
   * Time when the subscription has started.
   * Could be in the future.
   * @readonly
   */
  readonly startsAt?: Date;
  /**
   * A store of the purchase.
   * @readonly
   */
  readonly store: VendorStore;
  /**
   * Time when the auto-renewable subscription was cancelled.
   * Subscription can still be active,
   * it means that auto-renewal is turned off.
   * Would be `null` if a user reactivates the subscription.
   */
  readonly unsubscribedAt?: Date;
  /**
   * An original transaction id of the purchase
   * in a store that unlocked this subscription.
   * For auto-renewable subscription,
   * this will be an id of the first transaction
   *  in this subscription.
   * @readonly
   */
  readonly vendorOriginalTransactionId: string;
  /**
   * An identifier of a product in a store that unlocked this subscription.
   * @readonly
   */
  readonly vendorProductId: string;
  /**
   * A transaction id of a purchase in a store that unlocked this subscription.
   * @readonly
   */
  readonly vendorTransactionId: string;
  /**
   * `true` if the auto-renewable subscription is set to renew
   * @readonly
   */
  readonly willRenew: boolean;
}

/**
 * Describes an object that represents a product.
 * Used in {@link Adapty.getPaywallProducts} method and in {@link Adapty.makePurchase} method.
 * @public
 */
export interface AdaptyProduct {
  /**
   * The currency code of the locale
   * used to format the price of the product.
   * The ISO 4217 (USD, EUR).
   * @readonly
   */
  readonly currencyCode?: string;
  /**
   * The currency symbol of the locale
   * used to format the price of the product.
   * ($, €).
   * @readonly
   */
  readonly currencySymbol?: string;
  /**
   * An object containing introductory price information for a product.
   * iOS: Will be null for iOS version below 11.2
   * and macOS version below 10.14.4.
   */
  readonly introductoryDiscount?: AdaptyProductDiscount;
  /**
   * User's eligibility for your introductory offer.
   * Check this property before displaying info about
   * introductory offers (i.e. free trials)
   * @readonly
   */
  readonly introductoryOfferEligibility: OfferEligibility;
  /**
   * A description of the product.
   * @readonly
   */
  readonly localizedDescription: string;
  /**
   * A price’s language is determined
   * by the preferred language set on the device.
   * On Android, the formatted price from Google Play as is.
   * @readonly
   */
  readonly localizedPrice?: string;
  /**
   * The period’s language is determined
   * by the preferred language set on the device.
   * @readonly
   */
  readonly localizedSubscriptionPeriod?: string;
  /**
   * The name of the product.
   * @readonly
   */
  readonly localizedTitle: string;
  /**
   * Same as `abTestName` property of the parent {@link AdaptyPaywall}.
   * @readonly
   */
  readonly paywallABTestName: string;
  /**
   * Same as `name` property of the parent {@link AdaptyPaywall}.
   * @readonly
   */
  readonly paywallName: string;
  /**
   * The cost of the product in the local currency
   * @readonly
   */
  readonly price: number;
  /**
   * The period details for products that are subscriptions.
   * Will be `null` for iOS version below 11.2 and macOS version below 10.14.4.
   * @readonly
   */
  readonly subscriptionPeriod?: AdaptySubscriptionPeriod;
  /**
   * Same as `variationId` property of the parent {@link AdaptyPaywall}.
   * @readonly
   */
  readonly variationId: string;
  /**
   * Unique identifier of a product
   * from App Store Connect or Google Play Console
   * @readonly
   */
  readonly vendorProductId: string;

  android?: {
    /**
     * An object containing free trial information for the given product.
     * @see {@link https://developer.android.com/google/play/billing/subscriptions#free-trial}
     * @readonly
     */
    readonly freeTrialPeriod?: AdaptySubscriptionPeriod;
    /**
     * The period’s language is determined
     * by the preferred language set on the device.
     * @readonly
     */
    readonly localizedFreeTrialPeriod?: string;
  };
  ios?: {
    /**
     * An array of subscription offers available for the auto-renewable subscription.
     * Will be empty for iOS version below 12.2
     * and macOS version below 10.14.4.
     * @readonly
     */
    readonly discounts: AdaptyProductDiscount[];
    /**
     * Boolean value that indicates
     * whether the product is available for family sharing
     * in App Store Connect.
     * Will be `false` for iOS version below 14.0 and macOS version below 11.0.
     * @see {@link https://developer.apple.com/documentation/storekit/skproduct/3564805-isfamilyshareable}
     * @readonly
     */
    readonly isFamilyShareable: boolean;
    /**
     * User's eligibility for the promotional offers.
     * Check this property before displaying info
     * about promotional offers
     * @readonly
     */
    readonly promotionalOfferEligibility: OfferEligibility;
    /**
     * An identifier of a promotional offer,
     * provided by Adapty for this specific user.
     * @readonly
     */
    readonly promotionalOfferId?: string;
    /**
     * The region code of the locale used to format the price of the product.
     * ISO 3166 ALPHA-2 (US, DE)
     * @readonly
     */
    readonly regionCode?: string;
    /**
     * An identifier of the subscription group
     * to which the subscription belongs.
     * Will be `null` for iOS version below 12.0 and macOS version below 10.14.
     * @readonly
     */
    readonly subscriptionGroupIdentifier?: string;
  };
}

/**
 * Discount model to products
 * @see {@link https://doc.adapty.io/docs/rn-api-reference#adaptyproductdiscount}
 */
export interface AdaptyProductDiscount {
  /**
   * A formatted number of periods of a discount for a user’s locale.
   * @readonly
   */
  readonly localizedNumberOfPeriods?: string;
  /**
   * A formatted price of a discount for a user’s locale.
   * @readonly
   */
  readonly localizedPrice?: string;
  /**
   * A formatted subscription period of a discount for a user’s locale.
   * @readonly
   */
  readonly localizedSubscriptionPeriod?: string;
  /**
   * A number of periods this product discount is available.
   * @readonly
   */
  readonly numberOfPeriods: number;
  /**
   * Discount price of a product in a local currency.
   * @readonly
   */
  readonly price: number;
  /**
   * An information about period for a product discount.
   * @readonly
   */
  readonly subscriptionPeriod: AdaptySubscriptionPeriod;

  ios?: {
    /**
     * Unique identifier of a discount offer for a product.
     * @see {@link https://developer.apple.com/documentation/storekit/skpaymentdiscount/3043528-identifier}
     * @readonly
     */
    readonly identifier?: string;
    /**
     * A payment mode for this product discount.
     * @readonly
     */
    readonly paymentMode: OfferType;
  };
}

/**
 * An object containing information about a subscription period.
 * @public
 */
export interface AdaptySubscriptionPeriod {
  /**
   * A number of period units.
   * @readonly
   */
  readonly numberOfUnits: number;
  /**
   * A unit of time that a subscription period is specified in.
   * @readonly
   */
  readonly unit: ProductPeriod;
}

export interface AdaptyProfileParameters {
  analyticsDisabled?: boolean;
  codableCustomAttributes?: { [key: string]: any };
  appTrackingTransparencyStatus?: AppTrackingTransparencyStatus;
  storeCountry?: string;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  birthday?: string;
  email?: string;
  phoneNumber?: string;
  facebookAnonymousId?: string;
  amplitudeUserId?: string;
  amplitudeDeviceId?: string;
  mixpanelUserId?: string;
  appmetricaProfileId?: string;
  appmetricaDeviceId?: string;
  oneSignalPlayerId?: string;
  pushwooshHWID?: string;
  firebaseAppInstanceId?: string;
}
