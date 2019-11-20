// Vi har oprettet klassen Route for at kunne oprette Route-objekter i appen.
// Klassen består af 2 variabler og 2 metoder.


export default class Route {
    constructor(title) {
        this._title = title;
        this.routePoints = [];
    }

    addRoutePoint(routePoint) {
        this.routePoints.push(routePoint);
    }

    getRoutePoints() {
        return this.routePoints.length;
    }
}