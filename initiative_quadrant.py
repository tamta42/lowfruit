import matplotlib.pyplot as plt


def get_initiatives():
    initiatives = []
    while True:
        name = input("Enter initiative name (or blank to finish): ").strip()
        if not name:
            break
        cost = get_rating("cost rating")
        value = get_rating("business value rating")
        initiatives.append((name, cost, value))
    return initiatives


def get_rating(prompt):
    while True:
        try:
            rating = float(input(f"Enter {prompt} (1-5): "))
        except ValueError:
            print("Please enter a number between 1 and 5.")
            continue
        if 1 <= rating <= 5:
            return rating
        print("Rating must be between 1 and 5.")


def plot_initiatives(initiatives):
    fig, ax = plt.subplots()
    for name, cost, value in initiatives:
        ax.scatter(cost, value)
        ax.text(cost + 0.05, value + 0.05, name)

    ax.set_xlabel("Cost")
    ax.set_ylabel("Business Value")
    ax.set_title("Initiatives Quadrant")
    ax.grid(True)

    ax.set_xlim(0, 5.5)
    ax.set_ylim(0, 5.5)
    # draw quadrant lines at midpoint 3
    ax.axvline(3, color='black', linestyle='--')
    ax.axhline(3, color='black', linestyle='--')

    plt.tight_layout()
    # Save plot to file in case running headless
    plt.savefig("initiatives.png")
    try:
        plt.show()
    except Exception:
        pass


if __name__ == "__main__":
    initiatives = get_initiatives()
    if initiatives:
        plot_initiatives(initiatives)
    else:
        print("No initiatives to plot.")
