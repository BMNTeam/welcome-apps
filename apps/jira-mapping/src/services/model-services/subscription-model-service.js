const { Subscription } = require('../../db/models');

const getSubscription = async (subscriptionId) => {
  try {
    const subscription = await Subscription.findByPk(subscriptionId);
    return subscription;
  } catch (err) {
    console.error(err);
  }
};

const createSubscription = async (attributes) => {
  const { mondayWebhookUrl } = attributes;

  try {
    const newSubscription = await Subscription.create({
      active: true,
      mondayWebhookUrl,
    });
    return newSubscription;
  } catch (err) {
    console.error(err);
  }
};

const updateSubscription = async (subscriptionId, updates) => {
  const { mondayWebhookUrl, webhookId } = updates;
  try {
    const subscription = await Subscription.update(
      { mondayWebhookUrl, webhookId },
      {
        where: {
          id: subscriptionId,
        },
      }
    );
    return subscription;
  } catch (err) {
    console.error(err);
  }
};

const deleteSubscription = async (subscriptionId) => {
  try {
    const subscription = await Subscription.update(
      { active: false },
      {
        where: {
          id: subscriptionId,
        },
      }
    );
    return subscription;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getSubscription,
  createSubscription,
  updateSubscription,
  deleteSubscription,
};
