import React, { Component } from "react";
import Aux from "../../hoc/Hoc";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.6,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseble: false,
    isPurchased: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get("https://react-burger-app-8dfbd.firebaseio.com/ingredients.json")
      .then(res => {
        this.setState({
          ingredients: res.data
        })
      })
      .catch((error) => {
        this.setState({ error: true })
      })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchaseble: sum > 0 });
  }

  addIngredientsHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientsHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ isPurchased: true });
  };

  purchaseCancelHandler = () => {
    this.setState({
      isPurchased: false,
    });
  };

  purchaseContinueHandler = () => {
    this.setState({
      loading: true
    })

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Kris",
        adress: {
          street: "Teststreet",
          zipcode: "233213",
          country: "Belarus"
        },
        email: "test@gmail.com",
      },
      deliveryMethod: "fastest"
    }
    axios.post("/orders.json", order)
      .then(res => { this.setState({ loading: false, isPurchased: false }) })
      .catch(e => {
        this.setState({ loading: false, isPurchased: false });
        console.log(e)
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : < Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientsHandler}
            ingredientRemoved={this.removeIngredientsHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseble={this.state.purchaseble}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = <OrderSummary
        price={this.state.totalPrice.toFixed(2)}
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />;

      if (this.state.loading) {
        orderSummary = <Spinner />
      }
    }

    return (
      <Aux>
        <Modal
          show={this.state.isPurchased}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
