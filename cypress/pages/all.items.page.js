import { BasePage } from "./base.page";
import { itemCard } from "./elements/item.card.element";

class AllItemsPage extends BasePage {
    get itemCard() {
        return itemCard;
      }
}

const allItemsPage = new AllItemsPage();

export {
    AllItemsPage,
    allItemsPage
}
