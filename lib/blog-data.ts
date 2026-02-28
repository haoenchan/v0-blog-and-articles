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
    slug: "oscillations-complete-guide",
    title: "Oscillations: From Punctured Sheets to Adiabatic Invariants",
    excerpt:
      "A complete guide to advanced oscillation problems. Includes effective potential derivations, massive springs, coupled oscillators, adiabatic invariants, and solutions to selected Physics Olympiad problems.",
    date: "February 28, 2026",
    readTime: "35 min read",
    category: "Physics",
    content: `## 1. Hole in an Infinite Sheet

**Problem:** A hole of radius $R$ is cut out from an infinite flat sheet with mass per unit area $\\sigma$. Let $L$ be the line perpendicular to the sheet passing through the center. [cite_start]Find the force on a mass $m$ on $L$ at distance $x$ [cite: 13-16].

**Solution:**
Consider a ring within the sheet with radius $r$ and thickness $dr$. Its mass is $dM = 2\\pi r \\sigma dr$. [cite_start]By symmetry, only the force component along $L$ survives [cite: 20-21]:

$$dF = -\\frac{Gm \\, dM}{x^2 + r^2} \\cos \\theta = -\\frac{Gm(2\\pi r \\sigma dr)}{x^2 + r^2} \\frac{x}{\\sqrt{x^2 + r^2}}$$

[cite_start]Integrating from $R$ to $\\infty$ [cite: 23-24]:

$$F = -2\\pi Gm\\sigma x \\int_{R}^{\\infty} \\frac{r \\, dr}{(x^2 + r^2)^{3/2}} = -\\frac{2\\pi Gm\\sigma x}{\\sqrt{x^2 + R^2}}$$

### Limiting Cases
1.  **Near Field ($x \\ll R$):** $\\sqrt{x^2 + R^2} \\approx R$. The force is linear, $F \\approx -\\frac{2\\pi G \\sigma m}{R} x$. [cite_start]This is Hooke's Law with frequency [cite: 25-28]:
    $$\\omega = \\sqrt{\\frac{2\\pi G \\sigma}{R}}$$

2.  **Far Field ($x \\gg R$):** The force approaches a constant $F \\approx -2\\pi Gm\\sigma$. This acts like a uniform acceleration $g_{eff} = 2\\pi G\\sigma$. [cite_start]The period is derived from the fall time [cite: 29-32]:
    $$T = 4\\sqrt{\\frac{x}{\\pi G\\sigma}}$$

## 2. Energy: Mass on a Plane

**Problem:** A mass $M$ moves on a frictionless horizontal plane, connected by a string through a hole to a hanging mass $m$. $M$ moves in a circle of radius $r$. [cite_start]Find the frequency of small oscillations in $r$ [cite: 37-40].

**Solution:**
Let $r$ be the generalized coordinate. $m$ is at height $-r$.
**Kinetic Energy:** $M$ has radial speed $\\dot{r}$ and tangential velocity $v_{\\theta} = L/(Mr)$. [cite_start]Mass $m$ has speed $\\dot{r}$ [cite: 42-43]:
$$K = \\frac{1}{2}(M+m)\\dot{r}^2 + \\frac{L^2}{2Mr^2}$$

[cite_start]**Effective Potential:** Combining gravity ($V=mgr$) and the centrifugal term [cite: 45-47]:
$$V_{eff}(r) = mgr + \\frac{L^2}{2Mr^2}$$

[cite_start]**Equilibrium:** Set $V'_{eff}(r_0) = 0$ [cite: 48-49]:
$$mg - \\frac{L^2}{Mr_0^3} = 0 \\implies \\frac{L^2}{Mr_0^3} = mg$$

**Frequency:** The effective spring constant is $k_{eff} = V''_{eff}(r_0) = \\frac{3L^2}{Mr_0^4} = \\frac{3mg}{r_0}$. [cite_start]With effective mass $m_{eff} = M+m$, the frequency is [cite: 50-53]:
$$\\omega = \\sqrt{\\frac{3g}{r_0} \\frac{m}{M+m}}$$

## 3. Continuous Systems: The Massive Spring

**Problem:** A spring of constant $k$ and mass $m$ is attached to a mass $M$. [cite_start]Find the frequency[cite: 56].

**Solution:**
Assume uniform stretching. If $M$ moves at $v_0$, a point on the spring at $x$ moves at $v(x) = v_0(x/L)$.
[cite_start]**Kinetic Energy of Spring:** Integrating $\\frac{1}{2}(\\rho dx)v(x)^2$ yields $K_{spring} = \\frac{1}{6}mv_0^2$ [cite: 61-62].
**Total Energy:**
$$K_{tot} = \\frac{1}{2}Mv_0^2 + \\frac{1}{6}mv_0^2 = \\frac{1}{2}\\left(M+\\frac{m}{3}\\right)v_0^2$$

[cite_start]The effective mass is $M + m/3$, so $\\omega = \\sqrt{k/(M+m/3)}$[cite: 60, 65].

## 4. Coupled Oscillators & Normal Modes

### 4.1 Beats (Morin 4.10)
Two masses $m$ are connected by three springs. Outer springs have constant $k$, middle spring has $\\kappa \\ll k$.
**Equations of Motion:**
[cite_start]$m\\ddot{x}_1 = -kx_1 - \\kappa(x_1 - x_2)$ and $m\\ddot{x}_2 = -kx_2 - \\kappa(x_2 - x_1)$ [cite: 79-81].

**Normal Modes:**
1.  [cite_start]**Center of Mass ($y_1 = x_1 + x_2$):** $\\omega_1 = \\sqrt{k/m}$ [cite: 83-84].
2.  [cite_start]**Relative ($y_2 = x_1 - x_2$):** $\\omega_2 = \\sqrt{(k+2\\kappa)/m}$ [cite: 88-89].

[cite_start]If $x_1(0)=a, x_2(0)=0$, the motion exhibits **beats** with frequency $\\epsilon \\approx \\omega_1(\\kappa/2k)$[cite: 93]:
$$x_1(t) \\approx a \\cos((\\omega+\\epsilon)t) \\cos(\\epsilon t)$$

### 4.2 Masses on a Hoop (IPhO 1986)
$N$ masses $m$ on a hoop connected by springs $k$. [cite_start]Guess a traveling wave $x_j(t) = A e^{i(\\omega t + j\\phi)}$ [cite: 96-98].
Boundary condition $x_{N+1} = x_1$ implies $\\phi_n = 2\\pi n / N$.
[cite_start]The dispersion relation is derived as[cite: 104]:
$$\\omega_n = 2\\sqrt{\\frac{k}{m}} \\left| \\sin\\left(\\frac{\\pi n}{N}\\right) \\right|$$

## 5. Adiabatic Invariants

**Problem:** A pendulum's length slowly changes from $L$ to $L/2$. [cite_start]Find the new amplitude [cite: 106-107].

**Solution:**
The action $J = \\oint p \\, dq$ is an adiabatic invariant. [cite_start]$J \\propto E/\\omega$ [cite: 111-115].
Since $E \\propto mgL\\theta_0^2$ and $\\omega \\propto \\sqrt{g/L}$:
$$\\frac{mgL\\theta_0^2}{\sqrt{g/L}} = \\text{const} \\implies \\theta_0 \\propto L^{-3/4}$$
[cite_start]If $L \\to L/2$, $\\theta_{new} = \\theta_0 (2)^{3/4} \\approx 1.68 \\theta_0$ [cite: 116-118].

## 6. Buoyancy

**Glacier:** A cube of side $L$ and density $\\rho_i$ floats in water $\\rho_w$. Restoring force is $-\\rho_w g L^2 x$.
[cite_start]$$\\omega = \\sqrt{\\frac{\\rho_w g}{\\rho_i L}}$$[cite: 121, 128].

**Ball:** Radius $R$, half-submerged. $k = \\rho_w g (\\pi R^2)$ and $m = \\frac{2}{3}\\pi \\rho_w R^3$.
[cite_start]$$\\omega = \\sqrt{\\frac{3g}{2R}}$$[cite: 123, 133].

## 7. Rope in a Tube

[cite_start]**Problem:** Rope of length $l$ in a tube, ends differing by height $h$ [cite: 139-141].
**Solution:**
Use Generalized Coordinate $q$ (distance slid).
$K = \\frac{1}{2}(\\lambda l)\\dot{q}^2$.
[cite_start]Generalized Force $F_q = -\\partial V / \\partial q = \\lambda gh$ [cite: 146-149].
[cite_start]$$\\frac{d}{dt}\\left(\\frac{1}{2}\\lambda l \\dot{q}^2\\right) = (\\lambda gh)\\dot{q} \\implies \\ddot{q} = \\frac{gh}{l}$$[cite: 151].

## 8. Damped and Driven Systems

[cite_start]For $m\\ddot{x} + b\\dot{x} + kx = F_0 \\cos(\\omega t)$, we use complex ansatz $x(t) = A e^{i\\omega t}$ [cite: 155-157].
**Steady-state Amplitude:**
[cite_start]$$A_0 = \\frac{F_0}{\\sqrt{(k-m\\omega^2)^2 + (b\\omega)^2}}$$[cite: 164].
[cite_start]**Phase Shift:** $\\tan \\phi = \\frac{b\\omega}{k-m\\omega^2}$[cite: 166].

## 9. Springs

1.  **Vector Springs:** Mass attached to $n$ zero-length springs $k_i$ at positions $r_i$. [cite_start]Motion is SHM with $\\omega = \\sqrt{\\sum k_i / m}$ [cite: 170-176].
2.  [cite_start]**Projectile on Spring:** Projectile on zero-length spring traces an **ellipse** because $x$ and $y$ are independent SHM with same $\\omega$ [cite: 178-182].

## 10. Selected Olympiad Problems

**Water Sloshing (IPhO 1984):**
Water depth $h \\ll L$. Potential energy from tilting surface by $\\xi$: $U \\approx \\frac{1}{6}\\rho L w g \\xi^2$.
Kinetic energy from center of mass motion: $K \\approx \\frac{\\rho w L^3}{72h}\\dot{\xi}^2$.
[cite_start]$$T = 2\\pi \\sqrt{\\frac{L^2}{12gh}}$$ [cite: 191-205].

**Pendulum in a Train (PPP 79):**
Train accelerates at $a$. Effective gravity $g_{eff} = \\sqrt{g^2+a^2}$.
[cite_start]$$T = \\frac{2\\pi \\sqrt{L}}{(g^2+a^2)^{1/4}}$$ [cite: 207-217].

**Non-linear Spring (PPP 77):**
Restoring force $F \\propto x^3$ implies Potential $V \\propto x^4$. Dimensional analysis gives $T \\propto A^{-1}$. [cite_start]Doubling amplitude halves the period [cite: 218-223].

**Hanging Rod (F=ma 2022):**
Rod of length $2L$ hanging by two strings of length $L$. [cite_start]For horizontal oscillation, it behaves identically to a simple pendulum of length $L$: $T = 2\\pi\\sqrt{L/g}$ [cite: 224-232].`,
  },


]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return posts
}
