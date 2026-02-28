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
    slug: "oscillations",
    title: "Oscillations",
    excerpt:
      "Selected problems and solutions from Kevin Zhou's handouts — covering gravitational oscillations, energy methods, normal modes, adiabatic invariants, driven systems, and competition problems.",
    date: "February 28, 2026",
    readTime: "20 min read",
    category: "Physics",
    content: `## 1. Hole in an Infinite Sheet
*Morin 5.13*

A hole of radius $R$ is cut out from an infinite flat sheet with mass per unit area $\\sigma$. Let $L$ be the line perpendicular to the sheet passing through the center of the hole.

### (a) Force on mass $m$

Consider a ring within the sheet with radius $r$ and thickness $dr$. Its mass is $dM = 2\\pi r \\sigma \\, dr$. By symmetry, only the force component along $L$ survives:

$$dF = -\\frac{Gm \\, dM}{x^2 + r^2} \\cdot \\frac{x}{\\sqrt{x^2 + r^2}}$$

Integrating from $R$ to $\\infty$:

$$F = -\\frac{2\\pi G m \\sigma x}{\\sqrt{x^2 + R^2}}$$

### (b) Small oscillations ($x \\ll R$)

For $x \\ll R$, we approximate $\\sqrt{x^2 + R^2} \\approx R$, giving Hooke's Law $F \\approx -\\frac{2\\pi G\\sigma}{R} x$:

$$\\omega = \\sqrt{\\frac{2\\pi G\\sigma}{R}}$$

### (c) Large $x$ regime ($x \\gg R$)

The force approaches a constant $g_{\\text{eff}} = 2\\pi G\\sigma$. The time to fall from height $x$ is $t_{\\text{fall}} = \\sqrt{2x/g_{\\text{eff}}}$, and the period is $4 \\times t_{\\text{fall}}$:

$$T = 4\\sqrt{\\frac{x}{\\pi G\\sigma}}$$

## 2. Mass on a Plane
*Cahn*

A particle of mass $M$ moves on a frictionless horizontal plane, connected by a string through a hole to a hanging mass $m$. $M$ moves in a circle of radius $r_0$ while $m$ is stationary. Find the frequency of small oscillations in $r$.

Using angular momentum $L$ as a conserved quantity, the effective radial potential is:

$$V_{\\text{eff}}(r) = mgr + \\frac{L^2}{2Mr^2}$$

Setting $V'_{\\text{eff}}(r_0) = 0$ gives equilibrium at $r_0$ where $\\frac{L^2}{Mr_0^3} = mg$. The effective spring constant is $k_{\\text{eff}} = V''_{\\text{eff}}(r_0) = \\frac{3mg}{r_0}$, and the effective mass is $M + m$:

$$\\omega = \\sqrt{\\frac{3g}{r_0} \\cdot \\frac{m}{M+m}}$$

## 3. The Massive Spring
*Continuous Systems*

A uniform spring of constant $k$ and mass $m$ is attached to a wall and a mass $M$.

### (a) Perturbative limit $m \\ll M$

Assuming uniform stretch, a point at position $x$ along the spring (total length $L$) moves at $v(x) = v_0(x/L)$. Integrating the kinetic energy of the spring:

$$K_{\\text{spring}} = \\frac{1}{6}mv_0^2 \\implies m_{\\text{eff}} = M + \\frac{m}{3}$$

$$\\omega = \\sqrt{\\frac{k}{M + m/3}}$$

### (b) General mass ratio

The full wave equation approach yields the transcendental equation (with $\\alpha = \\sqrt{m/M}$ and $\\omega_0 = \\sqrt{k/M}$):

$$\\tan\\!\\left(\\frac{\\alpha\\omega}{\\omega_0}\\right) = \\frac{\\alpha\\omega_0}{\\omega}$$

## 4. Coupled Oscillators & Normal Modes

### Beats
*Morin 4.10*

Three springs and two equal masses between two walls. Outer springs have constant $k$, middle spring $\\kappa \\ll k$. Initial conditions: $x_1(0) = a$, $x_2(0) = 0$.

Normal coordinates: $y_1 = x_1 + x_2$ (CM mode, $\\omega_1 = \\sqrt{k/m}$) and $y_2 = x_1 - x_2$ (relative mode, $\\omega_2 = \\sqrt{(k+2\\kappa)/m}$). With $\\varepsilon \\approx \\omega_1 \\kappa/(2k)$:

$$x_1(t) \\approx a\\cos((\\omega + \\varepsilon)t)\\cos(\\varepsilon t)$$

Energy sloshes between the two masses at the slow beat frequency $\\varepsilon$.

### Masses on a Hoop
*IPhO 1986*

$N$ identical masses $m$ on a circular hoop connected by springs $k$. Using a traveling wave ansatz $x_j = Ae^{i(\\omega t + j\\varphi)}$ with periodic boundary condition $\\varphi_n = 2\\pi n/N$:

$$\\omega_n = 2\\sqrt{\\frac{k}{m}}\\left|\\sin\\frac{\\pi n}{N}\\right|$$

## 5. Adiabatic Invariants

A pendulum's length slowly changes from $L$ to $L/2$. How does the amplitude $\\theta_0$ change?

The action $J = \\oint p \\, dq$ is an adiabatic invariant. For a pendulum, $J \\propto E/\\omega$. With $E \\propto mgL\\theta_0^2$ and $\\omega \\propto \\sqrt{g/L}$:

$$\\theta_0^2 \\cdot L^{3/2} = \\text{constant} \\implies \\theta_0 \\propto L^{-3/4}$$

If $L \\to L/2$, the new amplitude is $\\theta_{\\text{new}} = \\theta_0 \\cdot 2^{3/4} \\approx 1.68\\,\\theta_0$. Counterintuitively — and contrary to Poe's *The Pit and the Pendulum* — shortening the pendulum **increases** the amplitude.

## 6. Buoyancy & Generalized Forces

### (a) Cubical Glacier

For a cubic glacier (side $L$, density $\\rho_i$) in water (density $\\rho_w$), the restoring force is $F = -\\rho_w g L^2 x$. With mass $M = \\rho_i L^3$:

$$\\omega = \\sqrt{\\frac{\\rho_w g}{\\rho_i L}}$$

### (b) Half-Submerged Ball

A ball of radius $R$ with $\\rho_{\\text{ball}} = \\rho_w/2$. The effective spring constant is $k = \\rho_w g \\pi R^2$, mass $m = \\frac{2}{3}\\pi\\rho_w R^3$:

$$\\omega = \\sqrt{\\frac{3g}{2R}}$$

### (c) Rope in a Tube

A rope of length $l$ and linear mass density $\\lambda$ in a frictionless tube, with left end higher than right end by $h$. Using generalized coordinates — when the rope slides by $dq$, a chunk $\\lambda\\,dq$ is transferred from height $h$ downward. The generalized force is $F_q = \\lambda g h$:

$$\\ddot{q} = \\frac{gh}{l}$$

## 7. Damped & Driven Systems

A damped harmonic oscillator obeys $m\\ddot{x} + b\\dot{x} + kx = F_0\\cos(\\omega t)$.

Using complex exponentials, write $x = \\tilde{A}e^{i\\omega t}$ and substitute:

$$\\tilde{A} = \\frac{F_0}{(k - m\\omega^2) + i(b\\omega)}$$

The physical amplitude $A_0 = |\\tilde{A}|$ and phase $\\tan\\varphi = \\frac{b\\omega}{k - m\\omega^2}$:

$$A_0 = \\frac{F_0}{\\sqrt{(k - m\\omega^2)^2 + (b\\omega)^2}}$$

## 8. Springs

### Vector Springs
*Morin 4.20*

Mass $m$ attached to $n$ springs (zero rest length, constants $k_i$, anchored at $\\mathbf{r}_i$). The total force is:

$$\\mathbf{F} = -\\left(\\sum_i k_i\\right)\\mathbf{r} + \\sum_i k_i \\mathbf{r}_i$$

This is SHM about a shifted equilibrium point with:

$$\\omega = \\sqrt{\\frac{\\sum k_i}{m}}$$

### Projectile on a Spring
*Morin 4.22*

A projectile attached to a zero-length spring of constant $k$. The force $\\mathbf{F} = -k\\mathbf{r} - mg\\hat{y}$ is equivalent to a spring centered at $\\mathbf{r}_{\\text{eq}} = (0, -mg/k)$. Both $x$ and $y$ are independent SHM with the same $\\omega = \\sqrt{k/m}$, so **the trajectory is an ellipse**. For the projectile to hit the ground moving straight down:

$$v = \\sqrt{\\frac{m}{k}} \\cdot \\frac{g}{\\sin\\theta}$$

## 9. PhO Problems

### Seiching in a Tank
*IPhO 1984, Problem 2*

Water sloshing in a rectangular tank (length $L$, depth $h \\ll L$). Using energy methods with tilt parameter $\\xi$, equating potential and kinetic energies:

$$T = 2\\pi\\sqrt{\\frac{L^2}{12gh}}$$

This agrees dimensionally with the shallow water wave speed $v = \\sqrt{gh}$.

### Pendulum in an Accelerating Train
*PPP 79*

In the train's non-inertial frame, the effective gravitational field is $g_{\\text{eff}} = \\sqrt{g^2 + a^2}$:

$$T = 2\\pi\\sqrt{\\frac{L}{g_{\\text{eff}}}} = \\frac{2\\pi\\sqrt{L}}{(g^2 + a^2)^{1/4}}$$

### Transverse Spring Oscillator
*PPP 77*

Two springs displaced transversely by $x$: the stretch is $\\Delta L \\approx x^2/2L$, giving a restoring force $\\propto x^3$ and potential $V \\propto x^4$. By dimensional analysis, $T \\propto A^{(2-4)/2} = A^{-1}$. **Doubling the amplitude halves the period:**

$$T_{\\text{new}} = T/2$$

### Rod on Two Strings
*F=ma 2022A*

A uniform rod of length $2L$ hanging from two strings of length $L$. The rod stays horizontal — no rotation — so the CM behaves exactly like a simple pendulum of length $L$:

$$T = 2\\pi\\sqrt{\\frac{L}{g}}$$`,
  }



]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return posts
}
