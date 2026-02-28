export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  content: string
}

export const posts: BlogPost[] = [
  {
    slug: "vietas-theorem",
    title: "Vieta's Theorem",
    excerpt:
      "An introduction to Vieta's Theorem — connecting the roots of a polynomial to its coefficients through symmetric sums, with worked examples from AMC and USAMO.",
    date: "February 28, 2026",
    readTime: "8 min read",
    category: "Math",
    content: `## 1. Definition

A polynomial in $x$ is a sum of multiples of powers of $x$. If the highest power of $x$ is $n$, then the polynomial is described as having degree $n$ in $x$.

**Definition 1.1.** A polynomial $P(x)$ of degree $n$ is defined as:

$$P(x) = a_n x^n + a_{n-1} x^{n-1} + \\cdots + a_1 x + a_0$$

where:
- $a_n, a_{n-1}, \\ldots, a_0$ are constants called **coefficients**.
- $a_n$, where $a_n \\neq 0$, is the **leading coefficient**.
- $n$ is a non-negative integer called the **degree** of the polynomial, denoted as $\\deg(P)$.

## 2. Roots Of A Polynomial

Roots of a polynomial are such that when $\\alpha$ is a root of the polynomial $P(x)$, then $P(\\alpha) = 0$. When a polynomial has an equal pair of roots, say $(x-2)^2(x-1)$, the roots are $2, 2$ and $1$. Subsequently we can say that each polynomial of degree $n$ has exactly $n$ roots.

**Definition 2.1.** The $k$-th symmetric sum, $S_k$, is given by:

$$S_k(x_1, \\ldots, x_n) = \\sum_{1 \\leq i_1 < i_2 < \\cdots < i_k \\leq n} x_{i_1} x_{i_2} \\cdots x_{i_k}$$

If we have a cubic polynomial with roots $\\alpha, \\beta, \\gamma$, the symmetric sums are simply:

$$S_1 = \\alpha + \\beta + \\gamma$$

$$S_2 = \\alpha\\beta + \\beta\\gamma + \\gamma\\alpha$$

$$S_3 = \\alpha\\beta\\gamma$$

For a cubic polynomial $P(x)$ where the leading coefficient is 1, these sums determine the coefficients:

$$P(x) = x^3 - (\\alpha + \\beta + \\gamma)x^2 + (\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha)x - (\\alpha\\beta\\gamma)$$

Or:

$$P(x) = x^3 - S_1 x^2 + S_2 x - S_3$$

Are you able to do the same for a quadratic polynomial? Notice anything familiar?

## 2.1 Vieta's Theorem

**Definition 2.2.** A direct consequence to this is Vieta's Theorem. Let a polynomial $P(x)$:

$$P(x) = a_n x^n + a_{n-1} x^{n-1} + \\cdots + a_2 x^2 + a_1 x + a_0$$

$$P(x) = a_n \\left( x^n + \\frac{a_{n-1}}{a_n} x^{n-1} + \\cdots + \\frac{a_2}{a_n} x^2 + \\frac{a_1}{a_n} x + \\frac{a_0}{a_n} \\right)$$

Similar to the above cubic case, we can then say that:

$$P(x) = a_n \\left( x^n - S_1 x^{n-1} + S_2 x^{n-2} - S_3 x^{n-3} + \\cdots + (-1)^n S_n \\right)$$

We factor out $a_n$ so that the leading coefficient inside the bracket is 1, and so we can write it in terms of $S$. Then,

**Coefficient of** $x^{n-1}$: $\\dfrac{a_{n-1}}{a_n} = -S_1 \\implies S_1 = -\\dfrac{a_{n-1}}{a_n}$

**Coefficient of** $x^{n-2}$: $\\dfrac{a_{n-2}}{a_n} = S_2 \\implies S_2 = \\dfrac{a_{n-2}}{a_n}$

**Coefficient of** $x^{n-3}$: $\\dfrac{a_{n-3}}{a_n} = -S_3 \\implies S_3 = -\\dfrac{a_{n-3}}{a_n}$

So, we can generalise that:

$$S_k = (-1)^k \\frac{a_{n-k}}{a_n}$$

and we are done.

## 2.2 Tutorial

**[AMC 10A 2006]** What is the sum of the reciprocals of the roots of the equation:

$$\\frac{2003}{2004}x + 1 + \\frac{1}{x} = 0$$

We can turn it into a quadratic:

$$\\frac{2003}{2004}x^2 + x + 1 = 0$$

Suppose $\\alpha$ and $\\beta$ are roots to the equation, so:

$$\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{\\alpha + \\beta}{\\alpha\\beta} = \\frac{S_1}{S_2}$$

Remember that for a $n$-degree polynomial:

$$S_1 = -\\frac{a_{n-1}}{a_n}, \\quad S_2 = \\frac{a_{n-2}}{a_n}$$

For a quadratic:

$$S_1 = -\\frac{a_1}{a_2}, \\quad S_2 = \\frac{a_0}{a_2}$$

So,

$$\\frac{S_1}{S_2} = \\frac{-\\frac{2004}{2003}}{\\frac{2004}{2003}} = -1$$

## 2.3 Exercises

**1.** Let $r_1, r_2, r_3$ be the roots of the polynomial $x^3 - 14x^2 + 15x - 16$. Compute $\\dfrac{1}{r_1} + \\dfrac{1}{r_2} + \\dfrac{1}{r_3}$.

**2. [AMC 10A 2006]** Let $a$ and $b$ be the roots of the equation $x^2 - mx + 2 = 0$. Suppose that $a + \\dfrac{1}{b}$ and $b + \\dfrac{1}{a}$ are the roots of the equation $x^2 - px + q = 0$. What is $q$?

**3. [USAMO 1984]** The product of two of the four roots of the quartic equation $x^4 - 18x^3 + kx^2 + 200x - 1984 = 0$ is $-32$. Determine the value of $k$.

**Answers:** $\\dfrac{15}{16}$, $6$, $86$.`,
  },
  {
    slug: "oscillations-gravity-potential",
    title: "Comprehensive Oscillations: Gravity, Effective Potential & Coupled Systems",
    excerpt:
      "A deep dive into non-standard oscillatory systems. We derive the gravitational field of a punctured infinite sheet, explore orbital stability using effective potential methods, and analyze coupled and continuous systems.",
    date: "February 28, 2026",
    readTime: "25 min read",
    category: "Physics",
    content: `## 1. Gravity of a Punctured Sheet

Standard gravitation problems often deal with spheres or solid sheets. A more interesting case arises when we introduce a defect: a hole of radius $R$ cut out of an infinite flat sheet with mass per unit area $\\sigma$.

**Definition 1.1.** We place a test mass $m$ on the central axis perpendicular to the sheet (line $L$) at a distance $x$ from the center [cite: 14-16].

To find the force, we consider a ring within the sheet with radius $r$ and thickness $dr$. The mass of this differential ring is $dM = 2\\pi r \\sigma dr$[cite: 20]. By symmetry, horizontal force components cancel, leaving only the component along $L$:

$$dF = -\\frac{Gm \\, dM}{x^2 + r^2} \\cos \\theta = -\\frac{Gm(2\\pi r \\sigma dr)}{x^2 + r^2} \\frac{x}{\\sqrt{x^2 + r^2}}$$

Integrating from the edge of the hole ($R$) to infinity [cite: 22-24]:

$$F = -2\\pi Gm\\sigma x \\int_{R}^{\\infty} \\frac{r \\, dr}{(x^2 + r^2)^{3/2}} = -\\frac{2\\pi Gm\\sigma x}{\\sqrt{x^2 + R^2}}$$

### 1.1 Limiting Cases

**Case 1: Near Field ($x \\ll R$).**
When close to the center, $\\sqrt{x^2 + R^2} \\approx R$. The force becomes linear [cite: 25-26]:

$$F \\approx -\\frac{2\\pi G \\sigma m}{R} x$$

This matches the form of Hooke's Law ($F = -k_{eff}x$), implying the mass undergoes Simple Harmonic Motion with frequency [cite: 27-28]:

$$\\omega = \\sqrt{\\frac{k_{eff}}{m}} = \\sqrt{\\frac{2\\pi G \\sigma}{R}}$$

**Case 2: Far Field ($x \\gg R$).**
Far away, the force approaches a constant, similar to a standard infinite sheet [cite: 29-30]:

$$F \\approx -2\\pi Gm\\sigma$$

This corresponds to a uniform acceleration $g_{eff} = 2\\pi G\\sigma$. The time to fall from height $x$ is $t_{fall} = \\sqrt{2x/g_{eff}}$, and the period is $4 \\times t_{fall}$[cite: 31]:

$$T = 4\\sqrt{\\frac{x}{\\pi G\\sigma}}$$

## 2. Energy: Mass on a Plane

**Problem:** A particle of mass $M$ moves on a frictionless horizontal plane. It is connected by a string passing through a hole to a hanging mass $m$. $M$ moves in a circle of radius $r$. Find the frequency of small oscillations in $r$ [cite: 37-40].

**Solution:**
We use energy methods. Since the string length is fixed, if $M$ is at radius $r$, $m$ is at a depth proportional to $-r$[cite: 41].

**Kinetic Energy:**
Both masses move radially with speed $\\dot{r}$. $M$ has an additional tangential velocity component related to its angular momentum $L$ ($v_{\\theta} = L/Mr$)[cite: 42].

$$K = \\frac{1}{2}(M+m)\\dot{r}^2 + \\frac{L^2}{2Mr^2}$$

**Effective Potential:**
Combining the potential energy $V = mgr$ with the centrifugal term from $K$:

$$V_{eff}(r) = mgr + \\frac{L^2}{2Mr^2}$$

To find the equilibrium radius $r_0$, we set $V'_{eff}(r_0) = 0$ [cite: 48-49]:

$$mg - \\frac{L^2}{Mr_0^3} = 0 \\implies \\frac{L^2}{Mr_0^3} = mg$$

To find the frequency of oscillation, we compute the "effective spring constant" $k_{eff}$ by taking the second derivative at $r_0$ [cite: 50-51]:

$$k_{eff} = V''_{eff}(r_0) = \\frac{3L^2}{Mr_0^4} = \\frac{3}{r_0}\\left(\\frac{L^2}{Mr_0^3}\\right) = \\frac{3mg}{r_0}$$

Using the total effective mass $m_{eff} = M + m$, the frequency is [cite: 52-53]:

$$\\omega = \\sqrt{\\frac{k_{eff}}{m_{eff}}} = \\sqrt{\\frac{3g}{r_0} \\frac{m}{M+m}}$$

## 3. Continuous Systems: The Massive Spring

**Problem:** A uniform spring of constant $k$ and mass $m$ is attached to a wall and a mass $M$. Find the frequency for $m \\ll M$ [cite: 55-56].

**Solution:**
Assume the spring stretches uniformly. If mass $M$ moves with velocity $v_0$, a point on the spring at distance $x$ moves at $v(x) = v_0(x/L)$. The kinetic energy of the spring is [cite: 61-62]:

$$K_{spring} = \\int_{0}^{L} \\frac{1}{2}(\\rho dx)\\left(v_0\\frac{x}{L}\\right)^2 = \\frac{1}{6}mv_0^2$$

Total Kinetic Energy:
$$K_{tot} = \\frac{1}{2}Mv_0^2 + \\frac{1}{6}mv_0^2 = \\frac{1}{2}\\left(M+\\frac{m}{3}\\right)v_0^2$$

Thus, $m_{eff} = M + m/3$, and the frequency is [cite: 63-65]:

$$\\omega = \\sqrt{\\frac{k}{M + m/3}}$$

## 4. Coupled Oscillators & Normal Modes

### 4.1 Beats
Three springs and two equal masses lie between two walls. The outer springs have constant $k$, and the middle spring has constant $\\kappa \\ll k$. If $x_1(0)=a$ and $x_2(0)=0$, describe the motion [cite: 76-78].

**Solution:**
We switch to normal coordinates.
* **Center of Mass mode ($y_1 = x_1 + x_2$):** $\\omega_1 = \\sqrt{k/m}$ [cite: 83-84].
* **Relative mode ($y_2 = x_1 - x_2$):** $\\omega_2 = \\sqrt{(k+2\\kappa)/m}$ [cite: 88-89].

Reconstructing positions yields beats where energy sloshes between masses at frequency $\\epsilon \\approx \\omega_1(\\kappa/2k)$ [cite: 91-94]:

$$x_1(t) \\approx a \\cos((\\omega + \\epsilon)t) \\cos(\\epsilon t)$$

### 4.2 Masses on a Hoop (IPhO 1986)
$N$ identical masses $m$ are on a circular hoop connected by springs $k$. We assume a traveling wave solution $x_j(t) = Ae^{i(\\omega t + j\\phi)}$ [cite: 96-98].
Boundary conditions require $\\phi_n = 2\\pi n / N$. The dispersion relation is[cite: 104]:

$$\\omega_n = 2\\sqrt{\\frac{k}{m}} \\left| \\sin\\left(\\frac{\\pi n}{N}\\right) \\right|$$

## 5. Adiabatic Invariants

**Problem:** Consider a pendulum whose length slowly changes from $L$ to $L/2$. How does amplitude $\\theta_0$ change? [cite: 106-107]

**Solution:**
For a slowly varying parameter, the action $J = \\oint p \\, dq$ is an adiabatic invariant. For a harmonic oscillator, $J \\propto E/\\omega$[cite: 111, 115].
Since $E \\propto mgL\\theta_0^2$ and $\\omega \\propto \\sqrt{g/L}$:

$$\\frac{mgL\\theta_0^2}{\sqrt{g/L}} = \\text{constant} \\implies \\theta_0^2 L^{3/2} = \\text{constant} \\implies \\theta_0 \\propto L^{-3/4}$$

If $L \\to L/2$, the new amplitude is $\\theta_{new} = \\theta_0 (2)^{3/4} \\approx 1.68\\theta_0$ [cite: 116-118].

## 6. Buoyancy

**Problem:** A cubical glacier of side $L$ and density $\\rho_i$ floats in water ($\\rho_w$). Find the frequency of vertical oscillations [cite: 121-122].

**Solution:**
The restoring force is the change in buoyant force: $F_{restore} = -\\rho_w g L^2 x$.
Total mass $M = \\rho_i L^3$. By Newton's second law [cite: 125-128]:

$$\\omega = \\sqrt{\\frac{\\rho_w g}{\\rho_i L}}$$

For a ball of radius $R$ half-submerged, $k = \\rho_w g (\\pi R^2)$ and $m = \\frac{2}{3}\\pi \\rho_w R^3$, yielding $\\omega = \\sqrt{3g/2R}$ [cite: 129-133].

## 7. Rope in a Tube

**Problem:** A rope of length $l$ and mass per length $\\lambda$ lies in a frictionless tube. The left end is higher than the right by height $h$. Find acceleration [cite: 139-141].

**Solution:**
Use Generalized Coordinates ($q$ = distance slid).
* **Kinetic Energy:** $K = \\frac{1}{2}(\\lambda l)\\dot{q}^2$[cite: 145].
* **Generalized Force:** Work done by gravity when mass $dm = \\lambda dq$ transfers from top to bottom is $dV = -(\\lambda dq)gh$. Thus $F_q = \\lambda gh$ [cite: 146-149].

Using $\\frac{d}{dt}(K) = P$:

$$\\frac{d}{dt}\\left(\\frac{1}{2}\\lambda l \\dot{q}^2\\right) = (\\lambda gh)\\dot{q} \\implies \\lambda l \\dot{q} \\ddot{q} = \\lambda gh \\dot{q} \\implies \\ddot{q} = \\frac{gh}{l}$$

## 8. Damped and Driven Systems

For a damped oscillator $m\\ddot{x} + b\\dot{x} + kx = F_0 \\cos(\\omega t)$, we solve using complex exponentials $x(t) = Ae^{i\\omega t}$.
The steady-state amplitude $A_0$ is[cite: 164]:

$$A_0 = \\frac{F_0}{\\sqrt{(k-m\\omega^2)^2 + (b\\omega)^2}}$$

The phase shift is $\\tan \\phi = \\frac{b\\omega}{k - m\\omega^2}$[cite: 166].

## 9. Springs

**Vector Springs:** A mass $m$ attached to $n$ zero-length springs with constants $k_i$ anchored at $r_i$ undergoes SHM about a shifted equilibrium with $\\omega = \\sqrt{\\frac{\\sum k_i}{m}}$ [cite: 170-176].

**Projectile on a Spring:** A projectile attached to a zero-length spring traces an **ellipse** because the $x$ and $y$ motions are independent SHM with the same $\\omega = \\sqrt{k/m}$ [cite: 178-182].

## 10. Selected Physics Olympiad Problems

**Water Sloshing (IPhO 1984):**
For water depth $h \\ll L$, potential energy is stored in a triangular wedge lifted by angle $\\xi$. Kinetic energy tracks the center of mass.
Period: $T = 2\\pi \\sqrt{\\frac{L^2}{12gh}}$ [cite: 204-205].

**Pendulum in a Train (PPP 79):**
In a train accelerating with $a$, the effective gravity is $g_{eff} = \\sqrt{g^2 + a^2}$. The period is [cite: 215-217]:

$$T = 2\\pi \\sqrt{\\frac{L}{g_{eff}}} = \\frac{2\\pi \\sqrt{L}}{(g^2+a^2)^{1/4}}$$

**Hanging Rod (F=ma 2022):**
A rod of length $2L$ hanging by two strings of length $L$ behaves identically to a simple pendulum of length $L$ for horizontal oscillations: $T = 2\\pi\\sqrt{L/g}$ [cite: 225-232].`,
  },

]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return posts
}
