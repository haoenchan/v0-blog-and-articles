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
      "An introduction to Vieta's Theorem, connecting the roots of a polynomial to its coefficients through symmetric sums, with worked examples from AMC and USAMO.",
    date: "February 20, 2026",
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
      "Selected problems and solutions from Kevin Zhou's handouts, covering gravitational oscillations, energy methods, normal modes, adiabatic invariants, driven systems, and competition problems.",
    date: "January 10, 2026",
    readTime: "20 min read",
    category: "Physics",
    content: `## 1. Hole

**Problem 1: Hole in an Infinite Sheet (Morin 5.13)**

A hole of radius $R$ is cut out from an infinite flat sheet with mass per unit area $\\sigma$. Let $L$ be the line that is perpendicular to the sheet and passes through the center of the hole.

(a) What is the force on a mass $m$ located on $L$ at a distance $x$ from the center?

(b) If released from rest at $x \\ll R$, find the approximate angular frequency of oscillation.

(c) If $x \\gg R$, find the period of oscillation.

**Solution:**

**(a)** Consider a ring within the sheet with radius $r$ and thickness $dr$. Its mass is $dM = 2\\pi r \\sigma \\, dr$. By symmetry, only the force component along $L$ survives. The contribution is:

$$dF = -\\frac{Gm \\, dM}{x^2 + r^2} \\cos\\theta = -\\frac{Gm(2\\pi r \\sigma \\, dr)}{x^2 + r^2} \\cdot \\frac{x}{\\sqrt{x^2 + r^2}}$$

Integrating from $R$ to $\\infty$:

$$F = -2\\pi Gm\\sigma x \\int_R^\\infty \\frac{r \\, dr}{(x^2 + r^2)^{3/2}} = -2\\pi Gm\\sigma x \\left[-\\frac{1}{\\sqrt{x^2 + r^2}}\\right]_R^\\infty$$

$$\\boxed{F = -\\frac{2\\pi Gm\\sigma x}{\\sqrt{x^2 + R^2}}}$$

**(b)** For $x \\ll R$, we approximate the denominator: $\\sqrt{x^2 + R^2} \\approx R$.

$$F \\approx -\\frac{2\\pi G\\sigma m}{R} x$$

This is the form of Hooke's Law $F = -k_{\\text{eff}} x$. The frequency is:

$$\\boxed{\\omega = \\sqrt{\\frac{2\\pi G\\sigma}{R}}}$$

**(c)** For $x \\gg R$, the force approaches a constant (similar to an infinite sheet without a hole):

$$F \\approx -2\\pi Gm\\sigma$$

This corresponds to a uniform acceleration $g_{\\text{eff}} = 2\\pi G\\sigma$. The time to fall from height $x$ is $t_{\\text{fall}} = \\sqrt{2x / g_{\\text{eff}}}$. Since the period is $4 \\times t_{\\text{fall}}$:

$$\\boxed{T = 4\\sqrt{\\frac{x}{\\pi G\\sigma}}}$$

---

## 2. Energy

**Problem 8: Mass on a Plane (Cahn)**

A particle of mass $M$ moves on a frictionless horizontal plane. It is connected by a massless string passing through a hole to a second mass $m$ hanging vertically. $M$ moves in a circle of radius $r$ while $m$ remains stationary. Find the frequency of small oscillations in $r$.

**Solution:**

Let $r$ be the generalized coordinate. The length of the string is fixed, so if $M$ is at radius $r$, $m$ is at height $-r$ (up to a constant).

**Kinetic Energy:** Both masses move with radial speed $\\dot{r}$. $M$ also has tangential velocity $v_\\theta = L/(Mr)$ where $L$ is angular momentum.

$$K = \\frac{1}{2}(M + m)\\dot{r}^2 + \\frac{L^2}{2Mr^2}$$

**Potential Energy:**

$$V = mgr$$

The effective potential for the radial motion includes the centrifugal barrier:

$$V_{\\text{eff}}(r) = mgr + \\frac{L^2}{2Mr^2}$$

To find the equilibrium $r_0$, we set $V'_{\\text{eff}}(r_0) = 0$:

$$mg - \\frac{L^2}{Mr_0^3} = 0 \\implies \\frac{L^2}{Mr_0^3} = mg$$

To find the frequency, we compute the second derivative (the effective spring constant):

$$k_{\\text{eff}} = V''_{\\text{eff}}(r_0) = \\frac{3L^2}{Mr_0^4} = \\frac{3}{r_0}\\left(\\frac{L^2}{Mr_0^3}\\right) = \\frac{3mg}{r_0}$$

The effective mass for the radial oscillation is $m_{\\text{eff}} = M + m$.

$$\\boxed{\\omega = \\sqrt{\\frac{3mg/r_0}{M + m}} = \\sqrt{\\frac{3g}{r_0} \\cdot \\frac{m}{M + m}}}$$

---

## 3. Continuous Systems

**Problem 12: The Massive Spring**

A uniform spring of constant $k$ and mass $m$ is attached to a wall and a mass $M$.

(a) Show that for $m \\ll M$, the frequency is $\\omega = \\sqrt{k/(M + m/3)}$.

(b) Generalize for arbitrary mass ratios.

**Solution:**

**(a)** Assume the spring stretches uniformly. If the end mass $M$ moves with velocity $v_0$, a point on the spring at distance $x$ (where total length is $L$) moves at $v(x) = v_0(x/L)$.

The kinetic energy of the spring is:

$$K_{\\text{spring}} = \\int_0^L \\frac{1}{2}(\\rho \\, dx)\\left(\\frac{v_0 x}{L}\\right)^2 = \\frac{1}{2}\\frac{m}{L}\\frac{v_0^2}{L^2}\\left[\\frac{x^3}{3}\\right]_0^L = \\frac{1}{6}mv_0^2$$

**Total Kinetic Energy:**

$$K_{\\text{tot}} = \\frac{1}{2}Mv_0^2 + \\frac{1}{6}mv_0^2 = \\frac{1}{2}\\left(M + \\frac{m}{3}\\right)v_0^2$$

Thus $m_{\\text{eff}} = M + m/3$.

$$\\boxed{\\omega = \\sqrt{\\frac{k}{M + m/3}}}$$

**(b)** For the general case, we treat the spring as a wave. The displacement $u(x, t)$ satisfies the wave equation. The boundary condition at the mass $M$ ($x = L$) is:

$$-F_{\\text{spring}} = M\\ddot{u}(L, t) \\implies -kL\\frac{\\partial u}{\\partial x} = M\\ddot{u}$$

Assuming a standing wave solution $u(x, t) = \\sin(qx)\\cos(\\omega t)$ where $\\omega = v_{\\text{wave}} q$:

$$-kLq\\cos(qL) = -M\\omega^2 \\sin(qL)$$

Let $\\alpha = \\sqrt{m/M}$. The condition simplifies to the transcendental equation:

$$\\boxed{\\tan\\!\\left(\\frac{\\alpha\\omega}{\\omega_0}\\right) = \\frac{\\alpha\\omega_0}{\\omega}}$$

where $\\omega_0 = \\sqrt{k/M}$.

---

## 4. Coupled Oscillators & Normal Modes

**Problem 21: Beats (Morin 4.10)**

Three springs and two equal masses lie between two walls. The outer springs have constant $k$, and the middle spring has constant $\\kappa \\ll k$. If $x_1(0) = a$ and $x_2(0) = 0$, describe the motion.

**Solution:**

The equations of motion are:

$$m\\ddot{x}_1 = -kx_1 - \\kappa(x_1 - x_2)$$

$$m\\ddot{x}_2 = -kx_2 - \\kappa(x_2 - x_1)$$

We switch to normal coordinates (sum and difference):

- Let $y_1 = x_1 + x_2$ (Center of Mass mode). Adding the EOMs:

$$m\\ddot{y}_1 = -ky_1 \\implies \\omega_1 = \\sqrt{k/m}$$

- Let $y_2 = x_1 - x_2$ (Relative mode). Subtracting the EOMs:

$$m\\ddot{y}_2 = -(k + 2\\kappa)y_2 \\implies \\omega_2 = \\sqrt{(k + 2\\kappa)/m}$$

Initial conditions imply $y_1(0) = a$ and $y_2(0) = a$. Reconstructing the positions:

$$x_1(t) = \\frac{1}{2}(y_1 + y_2) = \\frac{a}{2}(\\cos(\\omega_1 t) + \\cos(\\omega_2 t))$$

Using sum-to-product identities and defining $\\epsilon \\approx \\omega_1(\\kappa / 2k)$:

$$\\boxed{x_1(t) \\approx a\\cos((\\omega + \\epsilon)t)\\cos(\\epsilon t)}$$

This represents **beats**: the energy sloshes back and forth between the two masses at the slow frequency $\\epsilon$.

---

**Problem 23: Masses on a Hoop (IPhO 1986)**

$N$ identical masses $m$ are on a circular hoop connected by springs $k$. Find the normal modes.

**Solution:**

This system has discrete translational symmetry ($j \\to j+1$). We guess a solution of the form of a traveling wave around the ring:

$$x_j(t) = Ae^{i(\\omega t + j\\phi)}$$

The boundary condition is the circle: $x_{N+1} = x_1$, which implies $e^{iN\\phi} = 1$. Thus the phase shift between neighbors must be:

$$\\phi_n = \\frac{2\\pi n}{N} \\quad \\text{for } n = 0, \\ldots, N-1$$

The equation of motion for mass $j$ is:

$$m\\ddot{x}_j = -k(x_j - x_{j-1}) - k(x_j - x_{j+1}) = -k(2x_j - x_{j-1} - x_{j+1})$$

Plugging in the ansatz:

$$-m\\omega^2 = -k(2 - e^{-i\\phi_n} - e^{i\\phi_n}) = -k(2 - 2\\cos\\phi_n)$$

$$\\omega_n^2 = \\frac{2k}{m}(1 - \\cos\\phi_n) = \\frac{4k}{m}\\sin^2\\!\\left(\\frac{\\phi_n}{2}\\right)$$

$$\\boxed{\\omega_n = 2\\sqrt{\\frac{k}{m}}\\sin\\!\\left(\\frac{\\pi n}{N}\\right)}$$

---

## 5. Adiabatic Invariants

**Problem 25: Adiabatic Pendulum**

Consider a pendulum whose length slowly changes from $L$ to $L/2$. How does the amplitude $\\theta_0$ change?

**Solution:**

For a system with a slowly varying parameter, the action $J = \\oint p \\, dq$ is an adiabatic invariant (conserved).

For a pendulum, $E = \\frac{1}{2}mL^2\\dot{\\theta}^2 + \\frac{1}{2}mgL\\theta^2$. This traces an ellipse in phase space ($p_\\theta$ vs $\\theta$). The area of this ellipse is proportional to Energy / Frequency:

$$J \\propto \\frac{E}{\\omega}$$

Since $E \\propto mgL\\theta_0^2$ and $\\omega \\propto \\sqrt{g/L}$:

$$\\frac{mgL\\theta_0^2}{\\sqrt{g/L}} = \\text{constant} \\implies \\theta_0^2 L^{3/2} = \\text{constant}$$

$$\\theta_0 \\propto L^{-3/4}$$

If $L \\to L/2$, the new amplitude is:

$$\\boxed{\\theta_{\\text{new}} = \\theta_0 \\cdot 2^{3/4} \\approx 1.68\\,\\theta_0}$$

> **Note:** Unlike the intuition in Poe's *The Pit and the Pendulum*, lengthening the pendulum *decreases* the amplitude, while shortening it *increases* the amplitude.

---

## 6. Buoyancy and Generalized Forces

**Problem 2: Oscillating Floating Objects**

(a) A cubical glacier of side length $L$ and density $\\rho_i$ floats in water of density $\\rho_w$. Find the angular frequency of small vertical oscillations.

(b) A ball of radius $R$ floats in water with exactly half its volume submerged. Find the frequency of small oscillations.

**Solution:**

**(a)** Let $x$ be the vertical displacement from equilibrium. The restoring force is the change in buoyant force:

$$F_{\\text{restore}} = -(\\rho_w g)(\\text{Area})\\,x = -\\rho_w g L^2 x$$

The total mass of the glacier is $M = \\rho_i L^3$. Using Newton's Second Law:

$$(\\rho_i L^3)\\ddot{x} = -\\rho_w L^2 g x$$

$$\\boxed{\\omega = \\sqrt{\\frac{\\rho_w g}{\\rho_i L}}}$$

**(b)** Since the ball is half submerged, its density must be $\\rho_{\\text{ball}} = \\frac{1}{2}\\rho_w$. The effective spring constant comes from the cross-sectional area at the water line, which is a circle of radius $R$:

$$k = \\rho_w g (\\pi R^2)$$

The mass of the ball is $m = \\rho_{\\text{ball}} V = \\frac{1}{2}\\rho_w \\left(\\frac{4}{3}\\pi R^3\\right) = \\frac{2}{3}\\pi \\rho_w R^3$.

$$\\boxed{\\omega = \\sqrt{\\frac{k}{m}} = \\sqrt{\\frac{\\pi R^2 \\rho_w g}{(2/3)\\pi \\rho_w R^3}} = \\sqrt{\\frac{3g}{2R}}}$$

> **Note:** This neglects the "virtual mass" of the water that moves with the object.

---

**Problem 6: Rope in a Tube**

A rope of length $l$ and uniform mass per length $\\lambda$ lies inside a frictionless tube. The tube is curved arbitrarily, but the left end is higher than the right end by a vertical height $h$. If released from rest, find the acceleration.

**Solution:**

Instead of resolving tension forces along the curve, use **Generalized Coordinates**. Let $q$ be the distance the rope has slid along the tube.

**Kinetic Energy:** Every part of the rope moves at speed $\\dot{q}$.

$$K = \\frac{1}{2}M_{\\text{total}}\\dot{q}^2 = \\frac{1}{2}(\\lambda l)\\dot{q}^2$$

**Generalized Force:** When the rope moves by $dq$, a small chunk of mass $dm = \\lambda \\, dq$ is effectively transferred from the back (top) to the front (bottom). The work done by gravity is the change in potential energy:

$$dV = -(dm)gh = -(\\lambda \\, dq)gh$$

Thus, the generalized force is $F_q = -\\frac{\\partial V}{\\partial q} = \\lambda g h$.

Using the energy equation $\\frac{d}{dt}(K) = \\text{Power}$:

$$\\frac{d}{dt}\\left(\\frac{1}{2}\\lambda l \\dot{q}^2\\right) = (\\lambda gh)\\dot{q}$$

$$\\lambda l \\dot{q}\\ddot{q} = \\lambda g h \\dot{q}$$

$$\\boxed{\\ddot{q} = \\frac{gh}{l}}$$

---

## 7. Damped and Driven Systems

**Problem 17: The Driven Oscillator**

A damped harmonic oscillator obeys the equation:

$$m\\ddot{x} + b\\dot{x} + kx = F_0 \\cos(\\omega t)$$

Using complex exponentials, find the steady-state amplitude $A_0$ and phase shift $\\phi$.

**Solution:**

We complexify the driving force to $F_0 e^{i\\omega t}$ and look for a solution $x(t) = \\tilde{A}e^{i\\omega t}$. Plugging this into the differential equation:

$$m(i\\omega)^2 \\tilde{A} + b(i\\omega)\\tilde{A} + k\\tilde{A} = F_0$$

$$\\tilde{A}(-m\\omega^2 + ib\\omega + k) = F_0$$

$$\\tilde{A} = \\frac{F_0}{(k - m\\omega^2) + i(b\\omega)}$$

The physical amplitude $A_0$ is the magnitude $|\\tilde{A}|$:

$$\\boxed{A_0 = \\frac{F_0}{\\sqrt{(k - m\\omega^2)^2 + (b\\omega)^2}}}$$

The phase shift $\\phi$ is the argument of the complex number in the denominator:

$$\\boxed{\\tan\\phi = \\frac{b\\omega}{k - m\\omega^2}}$$

---

## 8. Springs

**Problem 10: Vector Springs (Morin 4.20)**

A mass $m$ is attached to $n$ springs with relaxed lengths of zero and spring constants $k_1, k_2, \\ldots, k_n$. The anchor points are at arbitrary positions $\\mathbf{r}_i$. If the mass is given a kick from equilibrium, describe the motion.

**Solution:**

The force from the $i$-th spring is $\\mathbf{F}_i = -k_i(\\mathbf{r} - \\mathbf{r}_i)$. The total force is:

$$\\mathbf{F}_{\\text{net}} = \\sum_i -k_i(\\mathbf{r} - \\mathbf{r}_i) = -\\left(\\sum_i k_i\\right)\\mathbf{r} + \\sum_i k_i \\mathbf{r}_i$$

This is of the form $\\mathbf{F} = -K\\mathbf{r} + \\mathbf{C}$, where $K = \\sum k_i$ and $\\mathbf{C}$ is a constant vector. This describes **Simple Harmonic Motion** about a shifted equilibrium point with angular frequency:

$$\\boxed{\\omega = \\sqrt{\\frac{\\sum k_i}{m}}}$$

---

**Problem 11: Projectile on a Spring (Morin 4.22)**

A projectile of mass $m$ is attached to a zero-length spring of constant $k$. It is thrown with velocity $v$ at an angle $\\theta$.

(a) What is the shape of the trajectory?

(b) Find the velocity $v$ such that the projectile hits the ground traveling straight downward.

**Solution:**

**(a)** The force is $\\mathbf{F} = -k\\mathbf{r} - mg\\hat{y}$. This is equivalent to a single spring force centered at a shifted equilibrium $\\mathbf{r}_{\\text{eq}} = (0, -mg/k)$.

The $x$ and $y$ motions are independent SHM with the same $\\omega = \\sqrt{k/m}$. Thus, the trajectory is an **ellipse**.

**(b)** Let the vertical velocity be $v_y(t) = v_0 \\cos(\\omega t + \\phi)$. Hitting the ground straight down means $v_x = 0$. Since $v_x(t) = v\\cos\\theta\\cos(\\omega t)$, this happens at $\\omega t = \\pi/2$. At this time, we need $y = 0$. The vertical solution involves a phase shift $\\phi = \\pi/4$. Solving the kinematic constraints yields:

$$\\boxed{v = \\sqrt{\\frac{m}{k}} \\cdot \\frac{g}{\\sin\\theta}}$$

---

## 9. PhO Problems, Solutions

**IPhO 1984, Problem 2**

Estimate the period of oscillation for water sloshing back and forth (seiching) in a rectangular container of length $L$ and water depth $h$, where $h \\ll L$. Use energy methods.

**Solution:**

We approximate the motion by considering the water surface tilting by a small amount $\\xi$.

**Potential Energy:** The water displacement moves a triangular wedge of water from one side to the other. The mass of this wedge is $m = \\frac{1}{2}(L/2)(\\xi w)\\rho$, where $w$ is the width. The center of mass of this wedge rises by a distance $2\\xi/3$ relative to the lowered side. The total potential energy change is:

$$U \\approx mg\\left(\\frac{2\\xi}{3}\\right) = \\frac{1}{6}\\rho L w g \\xi^2$$

**Kinetic Energy:** We estimate the kinetic energy by tracking the center of mass of the entire water body. The center of mass shifts horizontally by $\\Delta x_{\\text{cm}}$. Using the moment of the displaced wedge:

$$M \\Delta x_{\\text{cm}} = m\\left(\\frac{2L}{3}\\right) \\implies \\Delta x_{\\text{cm}} = \\frac{1}{6}\\frac{L\\xi}{h}$$

The total mass is $M = \\rho L w h$. The kinetic energy is approximately:

$$K \\approx \\frac{1}{2}M\\dot{x}_{\\text{cm}}^2 = \\frac{1}{2}(\\rho Lwh)\\left(\\frac{L\\dot{\\xi}}{6h}\\right)^2 = \\frac{\\rho w L^3}{72h}\\dot{\\xi}^2$$

**Period:** Equating the energy forms to a harmonic oscillator, we find:

$$\\omega^2 = \\frac{k_{\\text{eff}}}{m_{\\text{eff}}} = \\frac{\\rho Lwg/3}{\\rho wL^3/36h} = \\frac{12gh}{L^2}$$

$$\\boxed{T = \\frac{2\\pi}{\\omega} = 2\\pi\\sqrt{\\frac{L^2}{12gh}}}$$

> **Note:** This result agrees dimensionally with the shallow water wave speed $v = \\sqrt{gh}$.

---

**PPP 79 (Problem 4)**

A pendulum of length $L$ hangs in a train. The train moves with uniform acceleration $a$. Find the period of small oscillations.

**Solution:**

In the train's non-inertial frame, there is a fictitious force $-ma$. This combines with gravity to create an effective gravitational field:

$$\\vec{g}_{\\text{eff}} = -a\\hat{x} - g\\hat{y} \\implies g_{\\text{eff}} = \\sqrt{g^2 + a^2}$$

The period for small oscillations is:

$$\\boxed{T = 2\\pi\\sqrt{\\frac{L}{g_{\\text{eff}}}} = \\frac{2\\pi\\sqrt{L}}{(g^2 + a^2)^{1/4}}}$$

---

**PPP 77 (Problem 13)**

A small bob of mass $m$ is attached to two light, unstretched, identical springs of length $L$. If displaced perpendicular to the line by $l$, the period is $T$. Find the period if displaced by $2l$.

**Solution:**

For a transverse displacement $x$, the stretch is $\\Delta L \\approx x^2 / 2L$. The tension is $F_{\\text{tens}} = k(x^2/2L)$. The restoring force component is:

$$F_{\\text{restoring}} \\approx -2F_{\\text{tens}}(x/L) \\propto -x^3$$

For a restoring force $F \\propto x^3$, the potential is $V \\propto x^4$. Dimensional analysis for period $T$ with potential $V = Cx^n$ gives $T \\propto A^{(2-n)/2}$. Here $n = 4$, so $T \\propto A^{-1}$.

Doubling the amplitude ($2l$) halves the period.

$$\\boxed{T_{\\text{new}} = T/2}$$

---

**F=ma 2022A**

A uniform rod of length $2L$ hangs from the ceiling by two vertical massless strings of length $L$ attached to its ends. The rod is pulled a small distance horizontally and released (remaining parallel to the ground). Find the period of oscillation.

**Solution:**

Let $\\theta$ be the angle the strings make with the vertical. This is the generalized coordinate.

Since the rod remains horizontal, it does not rotate about its center of mass, so there is no rotational kinetic energy term ($\\frac{1}{2}I\\omega^2 = 0$).

The center of mass moves exactly like a simple pendulum of length $L$:

$$K = \\frac{1}{2}M(L\\dot{\\theta})^2$$

$$V = MgL(1 - \\cos\\theta) \\approx \\frac{1}{2}MgL\\theta^2$$

This is mathematically identical to a simple pendulum of length $L$.

$$\\boxed{T = 2\\pi\\sqrt{\\frac{L}{g}}}$$`,
  },
  {
    slug: "Sums",
    title: "Sums",
    excerpt:
      "An introduction to mathematical notation and techniques — covering sigma notation, evaluating sums, telescopic sums, pi notation, cyclic and symmetric sums, with worked examples from AMC, AIME, and HMMT.",
    date: "February 28, 2026",
    readTime: "20 min read",
    category: "Math",
    content: `## A Note To The Reader

This article is gonna be a small chapter from a upcoming book that i am still currently working on! Its called Introduction To Inequalities.
---

## 1. Basic Notations And Some Properties

There will be some notations and symbols that we will use:

- $\\sum$ denotes the **Sigma Notation**
- $\\prod$ denotes the **Pi Notation**
- $\\mathbb{Z}$ denotes the set of integers
- $\\mathbb{Z}^+$ denotes the set of positive integers
- $\\mathbb{N}$ denotes the set of natural numbers
- **LHS** and **RHS** refer to Left Hand Side and Right Hand Side respectively
- $\\geq$ is read as "greater than or equal to"
- $>$ is read as "strictly greater than"
- $\\implies$ is read as "this implies that"
- $\\equiv$ is read as "is equivalent to"
- $\\iff$ is read as "if and only if"
- $A \\succ B$ is read as "A majorises B"

## 1.1 The Sigma Notation

In order to express a sum of multiple numbers, we use the sigma notation so that we do not have to write out all the sums. For example:

$$1 + 2 + 3 + 4 + 5 + \\cdots + n = \\sum_{k=1}^{n} k$$

The following is what I read as "Sigma from $k = 1$ to $k = n$", which simply means the sum from $1$ to $n$. Note that the $k$ is a **dummy variable**. It's just there — it can be anything!

$$1 + 2 + 3 + 4 + 5 + \\cdots + n = \\sum_{\\text{blablabla}=1}^{n} \\text{blablabla}$$

So basically:

$$\\text{start} + \\cdots + \\text{end} = \\sum_{\\text{anything}=\\text{start}}^{\\text{end}} \\text{anything}$$

Now, let's play around with the sigma notation:

$$2 + 4 + 6 + \\cdots + 2n = 2(1 + 2 + 3 + 4 + \\cdots + n) = 2\\sum_{k=1}^{n} k$$

Notice how there is no difference if the 2 is inside the sigma notation or outside of it:

$$\\sum_{k=1}^{n} 2k = 2 \\sum_{k=1}^{n} k$$

So generally, if $c$ is a constant, then:

$$\\sum_{k=1}^{n} ck = c \\sum_{k=1}^{n} k$$

## 1.2 Properties Of The Sigma Notation

Here are some general properties of the Sigma Notation.

**Proposition 1.** For any constant $c$:

$$\\sum_{k=1}^{n} c = nc$$

*Proof:* We are simply just adding $c$ to itself $n$ times, as there is no "dummy variable" within the Sigma Notation.

$$\\sum_{k=1}^{n} c = \\underbrace{c + c + \\cdots + c}_{n \\text{ times}} = n \\cdot c$$

**Proposition 2.** For any constant $c$:

$$\\sum_{k=1}^{n} ck = c \\sum_{k=1}^{n} k$$

*Proof:* We can simply factor $c$ out of the expanded sum.

$$\\sum_{k=1}^{n} ck = c + 2c + \\cdots + nc = c(1 + 2 + \\cdots + n) = c \\sum_{k=1}^{n} k$$

**Proposition 3.**

$$\\sum_{k=1}^{n} (a_k \\pm b_k) = \\sum_{k=1}^{n} a_k \\pm \\sum_{k=1}^{n} b_k$$

*Proof:* Expanding the notation into sums and grouping them together:

$$\\sum_{k=1}^{n} (a_k + b_k) = (a_1 + b_1) + (a_2 + b_2) + \\cdots + (a_n + b_n)$$

$$= (a_1 + \\cdots + a_n) + (b_1 + \\cdots + b_n) = \\sum_{k=1}^{n} a_k + \\sum_{k=1}^{n} b_k$$

We have discussed some basic properties of the sigma notation. Now let's do some examples.

**Example 1.1.** Evaluate the following:

$$\\sum_{i=1}^{10} (3i - 4)$$

We can expand the sum first:

$$\\sum_{i=1}^{10} (3i - 4) = \\sum_{i=1}^{10} 3i - \\sum_{i=1}^{10} 4 = 3(1 + 2 + 3 + \\cdots + 10) - 4 \\cdot 10 = 3(55) - 40 = 125$$

**Example 1.2.** Evaluate the following:

$$\\sum_{i=1}^{4} (i^3 + 3i - 8)$$

Simply expand:

$$\\sum_{i=1}^{4} (i^3 + 3i - 8) = \\sum_{i=1}^{4} i^3 + \\sum_{i=1}^{4} 3i - \\sum_{i=1}^{4} 8$$

$$= (1^3 + 2^3 + 3^3 + 4^3) + 3(1 + 2 + 3 + 4) - 8 \\cdot 4 = 100 + 30 - 32 = 98$$

## 1.3 Evaluating Sums

We want to unlock a very powerful tool first — the ability to evaluate any sum we want. Being able to evaluate $1 + 2 + 3 + 4 + \\cdots + 10$ is not hard with a calculator, but it would be very annoying to evaluate a large sum if there are a lot of terms!

Let's start by analysing $1 + 2 + 3 + 4 + \\cdots + 10$:

$$(1 + 10) + (2 + 9) + \\cdots + (5 + 6)$$

If we add 1 and 10, 2 and 9, 3 and 8 ... and 5 together with 6 we get 5 "elevens". So the sum is just $55$.

Let's try to find a formula for the sum of any number!

$$1 + 2 + 3 + \\cdots + n$$

We add 1 and $n$ together, 2 and $n-1$ together ...

$$\\underbrace{(n+1) + (n+1) + (n+1) + \\cdots + (n+1)}_{\\frac{n}{2} \\text{ times}}$$

$$= \\frac{n}{2}(n+1)$$

And finally:

$$\\boxed{\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}}$$

**Example 1.3.** Evaluate the sum of integers from 21 to 50:

$$21 + 22 + 23 + \\cdots + 50$$

Simply take the sum from 1 to 50 and subtract the sum from 1 to 20:

$$\\sum_{k=21}^{50} k = \\sum_{k=1}^{50} k - \\sum_{k=1}^{20} k = \\frac{50}{2}(51) - \\frac{20}{2}(21) = 25(51) - 10(21) = 1275 - 210 = 1065$$

---

### Sum of $k^2$

Consider $(k+1)^3 - k^3 = 3k^2 + 3k + 1$. If we sum both sides from $k = 1$ to $n$:

$$\\sum_{k=1}^{n} \\left[(k+1)^3 - k^3\\right] = \\sum_{k=1}^{n} (3k^2 + 3k + 1)$$

The left side telescopes to $(n+1)^3 - 1$:

$$(n+1)^3 - 1 = 3\\sum_{k=1}^{n} k^2 + 3\\left[\\frac{n(n+1)}{2}\\right] + n$$

$$2(n^3 + 3n^2 + 3n) - 3n(n+1) - 2n = 6\\sum_{k=1}^{n} k^2$$

$$2n^3 + 3n^2 + n = 6\\sum_{k=1}^{n} k^2$$

$$n(n+1)(2n+1) = 6\\sum_{k=1}^{n} k^2$$

$$\\boxed{\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}}$$

### Sum of $k^3$

The same method can be used by considering $(k+1)^4 - k^4 = 4k^3 + 6k^2 + 4k + 1$:

$$\\sum_{k=1}^{n} \\left[(k+1)^4 - k^4\\right] = 4\\sum_{k=1}^{n} k^3 + 6\\sum_{k=1}^{n} k^2 + 4\\sum_{k=1}^{n} k + \\sum_{k=1}^{n} 1$$

$$(n+1)^4 - 1 = 4\\sum_{k=1}^{n} k^3 + n(n+1)(2n+1) + 2n(n+1) + n$$

$$n^4 + 4n^3 + 6n^2 + 4n - (2n^3 + 3n^2 + n) - (2n^2 + 2n) - n = 4\\sum_{k=1}^{n} k^3$$

$$n^4 + 2n^3 + n^2 = 4\\sum_{k=1}^{n} k^3$$

$$n^2(n+1)^2 = 4\\sum_{k=1}^{n} k^3$$

$$\\boxed{\\sum_{k=1}^{n} k^3 = \\left[\\frac{n(n+1)}{2}\\right]^2}$$

### Summary of Formulas

$$\\sum_{k=1}^{n} c = nc$$

$$\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}$$

$$\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}$$

$$\\sum_{k=1}^{n} k^3 = \\left[\\frac{n(n+1)}{2}\\right]^2$$

**Example 1.4.** Evaluate the following:

$$\\sum_{k=1}^{n} (2k-1)^2$$

Expand the square first: $(2k-1)^2 = 4k^2 - 4k + 1$.

$$\\sum_{k=1}^{n} (4k^2 - 4k + 1) = 4\\sum_{k=1}^{n} k^2 - 4\\sum_{k=1}^{n} k + \\sum_{k=1}^{n} 1$$

$$= 4\\left[\\frac{n(n+1)(2n+1)}{6}\\right] - 4\\left[\\frac{n(n+1)}{2}\\right] + n$$

$$= \\frac{2n(n+1)(2n+1)}{3} - 2n(n+1) + n$$

$$= \\frac{4n^3 + 6n^2 + 2n - 6n^2 - 6n + 3n}{3} = \\frac{4n^3 - n}{3} = \\frac{n(4n^2 - 1)}{3}$$

**Example 1.5.** Evaluate the following in terms of $n$:

$$\\sum_{k=1}^{n} (k-1)^3$$

First, we expand: $(k-1)^3 = k^3 - 3k^2 + 3k - 1$.

$$\\sum_{k=1}^{n} (k^3 - 3k^2 + 3k - 1) = \\sum_{k=1}^{n} k^3 - 3\\sum_{k=1}^{n} k^2 + 3\\sum_{k=1}^{n} k - \\sum_{k=1}^{n} 1$$

$$= \\left[\\frac{n(n+1)}{2}\\right]^2 - 3\\left[\\frac{n(n+1)(2n+1)}{6}\\right] + 3\\left[\\frac{n(n+1)}{2}\\right] - n$$

$$= \\frac{n^2(n+1)^2 - 2n(n+1)(2n+1) + 6n(n+1) - 4n}{4}$$

$$= \\frac{(n^4 + 2n^3 + n^2) - (4n^3 + 6n^2 + 2n) + (6n^2 + 6n) - 4n}{4}$$

$$= \\frac{n^4 - 2n^3 + n^2}{4} = \\frac{n^2(n-1)^2}{4}$$

## 1.4 The Telescopic Sum

Let $a_k = f(k) - f(k+1)$, then:

$$\\sum_{k=1}^{n} a_k = \\sum_{k=1}^{n} [f(k) - f(k+1)]$$

$$a_1 + a_2 + \\cdots + a_n = \\underbrace{[f(1) - f(2)]}_{k=1} + \\underbrace{[f(2) - f(3)]}_{k=2} + \\cdots + \\underbrace{[f(n) - f(n+1)]}_{k=n}$$

$$S_n = f(1) - f(n+1)$$

The telescopic sum is where most terms cancel each other out, leaving only a few terms from the beginning and the end.

---

Here is a useful technique: **partial fractions**.

**Example 1.6.** Decompose the following into partial fractions:

$$\\frac{x+7}{(x-2)(x+1)}$$

Let:

$$\\frac{x+7}{(x-2)(x+1)} \\equiv \\frac{A}{x-2} + \\frac{B}{x+1}$$

$$x + 7 \\equiv A(x+1) + B(x-2)$$

The $\\equiv$ sign indicates that for any value of $x$, the LHS and RHS will always be equivalent. We can substitute any value of $x$ to find $A$ and $B$.

Let $x = -1$: $(-1) + 7 = A(0) + B(-3)$, so $6 = -3B \\implies B = -2$.

Let $x = 2$: $(2) + 7 = A(3) + B(0)$, so $9 = 3A \\implies A = 3$.

Then:

$$\\frac{x+7}{(x-2)(x+1)} = \\frac{3}{x-2} - \\frac{2}{x+1}$$

**Example 1.7.** Evaluate the sum:

$$S_n = \\sum_{k=1}^{n} \\frac{2}{k^2 + 2k}$$

Express in partial fractions:

$$\\frac{2}{k(k+2)} \\equiv \\frac{A}{k} + \\frac{B}{k+2}$$

$$2 \\equiv A(k+2) + Bk$$

Let $k = 0$: $2 = 2A \\implies A = 1$.

Let $k = -2$: $2 = -2B \\implies B = -1$.

$$\\frac{2}{k(k+2)} = \\frac{1}{k} - \\frac{1}{k+2}$$

Then expand:

$$S_n = \\left(\\frac{1}{1} - \\frac{1}{3}\\right) + \\left(\\frac{1}{2} - \\frac{1}{4}\\right) + \\left(\\frac{1}{3} - \\frac{1}{5}\\right) + \\cdots + \\left(\\frac{1}{n-1} - \\frac{1}{n+1}\\right) + \\left(\\frac{1}{n} - \\frac{1}{n+2}\\right)$$

After cancellation, $1 + \\frac{1}{2}$ is left at the front and $-\\frac{1}{n+1} - \\frac{1}{n+2}$ is left at the back:

$$S_n = \\frac{3}{2} - \\frac{1}{n+1} - \\frac{1}{n+2}$$

**Example 1.8.** *(2022 AMC 10)* The sum:

$$\\frac{1}{2!} + \\frac{2}{3!} + \\frac{3}{4!} + \\cdots + \\frac{2021}{2022!}$$

can be expressed as $a - \\dfrac{1}{b!}$, where $a$ and $b$ are positive integers. What is $a + b$?

For all positive integers $n$, we have:

$$\\frac{n}{(n+1)!} = \\frac{(n+1) - 1}{(n+1)!} = \\frac{1}{n!} - \\frac{1}{(n+1)!}$$

So:

$$\\frac{1}{2!} + \\frac{2}{3!} + \\cdots + \\frac{2021}{2022!} = \\left(\\frac{1}{1!} - \\frac{1}{2!}\\right) + \\left(\\frac{1}{2!} - \\frac{1}{3!}\\right) + \\cdots + \\left(\\frac{1}{2021!} - \\frac{1}{2022!}\\right)$$

$$= 1 - \\frac{1}{2022!}$$

So $a + b = 1 + 2022 = \\boxed{2023}$.

---

**Example 1.9.** *(Purple Comet 2004)* Define $a_k = (k^2 + 1)k!$ and $b_k = a_1 + a_2 + a_3 + \\cdots + a_k$. Let $\\dfrac{a_{100}}{b_{100}} = \\dfrac{m}{n}$ where $m$ and $n$ are relatively prime natural numbers. Find $n - m$.

Our strategy is to try to find a telescopic sum with cancellation:

$$(k^2 + 1)k! = k(k \\cdot k!) + k! = k[(k+1)! - k!] + k! = k(k+1)! - k \\cdot k! + k!$$

$$= k(k+1)! - k!(k-1)$$

So for $b_k$:

$$b_k = \\sum_{i=1}^{k} a_i = (1 \\cdot 2! - 1! \\cdot 0) + (2 \\cdot 3! - 2! \\cdot 1) + (3 \\cdot 4! - 3! \\cdot 2) + \\cdots + (k(k+1)! - k!(k-1))$$

After telescoping cancellation:

$$b_k = k(k+1)!$$

And finally:

$$\\frac{a_k}{b_k} = \\frac{(k^2+1)k!}{k(k+1)!} = \\frac{k^2+1}{k(k+1)} = \\frac{k^2+1}{k^2+k}$$

For $k = 100$:

$$\\frac{a_{100}}{b_{100}} = \\frac{100^2 + 1}{100^2 + 100} = \\frac{10001}{10100}$$

$$n - m = 10100 - 10001 = \\boxed{99}$$

## 1.5 The Pi Notation

Just as the Greek letter Sigma ($\\sum$) is used to denote a summation, the Greek letter Pi ($\\prod$) is used in mathematics to denote a **product** of a sequence of terms.

Here are some properties about the Pi Notation:

$$\\prod_{i=1}^{n} c = c^n$$

$$\\prod_{i=1}^{n} (a_i \\cdot b_i) = \\left(\\prod_{i=1}^{n} a_i\\right)\\left(\\prod_{i=1}^{n} b_i\\right)$$

$$\\prod_{i=1}^{n} i = n!$$

Pretty self-explanatory properties! The Pi notation is often used to display a large amount of products compactly.

**Example 1.10.** Simplify the following product into a single fraction:

$$\\prod_{n=2}^{k} \\frac{n-1}{n}$$

Simply expand the product:

$$\\prod_{n=2}^{k} \\frac{n-1}{n} = \\frac{1}{2} \\cdot \\frac{2}{3} \\cdot \\frac{3}{4} \\cdots \\frac{k-1}{k} = \\frac{1}{k}$$

**Example 1.11.** *(Harvard-MIT Mathematics Tournament 2006)* Find:

$$\\frac{2^2}{2^2 - 1} \\cdot \\frac{3^2}{3^2 - 1} \\cdot \\frac{4^2}{4^2 - 1} \\cdots \\frac{2006^2}{2006^2 - 1}$$

We can express it in Pi Notation:

$$\\prod_{n=2}^{2006} \\frac{n^2}{(n-1)(n+1)} = \\prod_{n=2}^{2006} \\frac{n}{n-1} \\cdot \\frac{n}{n+1}$$

$$= \\left(\\frac{2}{1} \\cdot \\frac{3}{2} \\cdot \\frac{4}{3} \\cdots \\frac{2006}{2005}\\right) \\cdot \\left(\\frac{2}{3} \\cdot \\frac{3}{4} \\cdot \\frac{4}{5} \\cdots \\frac{2006}{2007}\\right)$$

$$= \\frac{2006}{1} \\cdot \\frac{2}{2007} = \\boxed{\\frac{4012}{2007}}$$

## 1.6 Cyclic And Symmetric Sums

### Cyclic Sums

A cyclic sum is sometimes specified by $\\sum_{\\text{cyc}}$. This notation implies that all variables are cycled through. Consider a function $f(a_1, a_2, \\ldots, a_n)$:

$$\\sum_{\\text{cyc}} f(a_1, a_2, \\ldots, a_n) = f(a_1, a_2, \\ldots, a_n) + f(a_2, a_3, \\ldots, a_n, a_1) + \\cdots + f(a_n, a_1, a_2, \\ldots, a_{n-1})$$

An example:

$$\\sum_{\\text{cyc}} \\frac{a}{b+c} = \\frac{a}{b+c} + \\frac{b}{c+a} + \\frac{c}{a+b}$$

So $a$ becomes $b$, $b$ becomes $c$ ... for a cycle. If there are more variables, the cycle becomes longer!

However, sometimes we need not cycle through all the variables. So we list out the variables that are to be cycled through beneath the notation:

$$\\sum_{a,b,c} \\frac{ab}{cd} = \\frac{ab}{cd} + \\frac{bc}{ad} + \\frac{ca}{bd}$$

where $d$ remains untouched.

**Example 1.12.** Expand and simplify the following expression for three variables $\\{a, b, c\\}$:

$$\\sum_{\\text{cyc}} \\left(a - \\frac{\\sum_{\\text{cyc}} a}{b+c}\\right)^2$$

We expand the cyclic sum inside first: $\\sum_{\\text{cyc}} a = a + b + c$.

$$\\sum_{\\text{cyc}} \\left(\\frac{-(b+c)}{b+c}\\right)^2 = \\sum_{\\text{cyc}} (-1)^2 = 1 + 1 + 1 = 3$$

**Example 1.13.** Expand and simplify:

$$\\sum_{\\text{cyc}} a \\cdot \\sum_{\\text{cyc}} \\left(b \\cdot \\frac{\\sum_{\\text{cyc}} 1}{c}\\right)$$

We expand the cyclic sum inside first:

$$\\sum_{\\text{cyc}} \\frac{1}{c} = \\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c} = \\frac{ab + bc + ca}{abc}$$

Notice how $\\dfrac{ab + bc + ca}{abc}$ does not change after a cycle:

$$\\sum_{\\text{cyc}} b \\cdot \\frac{ab + bc + ca}{abc} = \\frac{(a+b+c)(ab+bc+ca)}{abc} \\cdot \\frac{1}{\\text{(after simplification)}}$$

$$= \\frac{abc(a+b+c)}{ab+bc+ca}$$

And finally:

$$\\sum_{\\text{cyc}} a \\cdot \\sum_{\\text{cyc}} \\left(b \\cdot \\frac{\\sum_{\\text{cyc}} 1}{c}\\right) = \\frac{abc(a+b+c)^2}{ab+bc+ca}$$

### Symmetric Sums

A symmetric sum $\\sum_{\\text{sym}} f(x_1, x_2, \\ldots, x_n)$ is defined as $\\sum_{\\sigma} f(x_{\\sigma(1)}, x_{\\sigma(2)}, \\ldots, x_{\\sigma(n)})$, where $\\sigma$ ranges over **all permutations** of $(1, 2, \\ldots, n)$.

For three variables $\\{a, b, c\\}$, there are 6 permutations of $abc$: $(a,b,c), (a,c,b), (b,a,c), (b,c,a), (c,a,b), (c,b,a)$.

$$\\sum_{\\text{sym}} abc = abc + acb + bac + bca + cab + cba = 6abc$$

On the other hand, if we want to only consider $ab$ over $\\{a, b, c\\}$:

$$\\sum_{\\text{sym}} ab = ab + ac + ba + bc + ca + cb$$

This is **NOT** to be confused with the cyclic sum:

$$\\sum_{\\text{cyc}} abc = abc + bca + cab = 3abc$$

The cyclic sum is only a single rotation of 3 terms in total, whilst the symmetric sum considers **every possible permutation** of the set.

**Example 1.14.** Expand and simplify the symmetric sum for $\\{a, b, c\\}$:

$$\\sum_{\\text{sym}} (a-b)^2$$

$$= (a-b)^2 + (a-c)^2 + (b-a)^2 + (b-c)^2 + (c-a)^2 + (c-b)^2$$

$$= 2\\left[(a-b)^2 + (b-c)^2 + (c-a)^2\\right]$$

**Example 1.15.** Expand the symmetric sum for $\\{a, b, c, d\\}$:

$$\\sum_{\\text{sym}} ab$$

Starting with $a$: $ab, ac, ad$. Starting with $b$: $ba, bc, bd$ ... So:

$$\\sum_{\\text{sym}} ab = ab + ac + ad + ba + bc + bd + ca + cb + cd + da + db + dc$$

**Example 1.16.** *(Muirhead's Inequality — further discussion in later chapters)*

If $x, y, z$ are non-negative integers, $(7, 3, 1)$ majorises $(5, 4, 2)$:

$$\\sum_{\\text{sym}} x^7 y^3 z \\geq \\sum_{\\text{sym}} x^5 y^4 z^2$$

Expanding:

$$x^7 y^3 z + x^7 z^3 y + y^7 x^3 z + y^7 z^3 x + z^7 x^3 y + z^7 y^3 x \\geq x^5 y^4 z^2 + x^5 z^4 y^2 + y^5 x^4 z^2 + y^5 z^4 x^2 + z^5 x^4 y^2 + z^5 y^4 x^2$$

## 1.7 Exercises

Time to implement what we have learnt!

**1.** Evaluate the following sum:

$$\\sum_{i=1}^{4} (2i - 1)$$

**2.** Find the value of:

$$\\sum_{k=0}^{3} (k^2 + 2)$$

**3.** Find the following sum:

$$\\sum_{n=1}^{5} \\frac{1}{n(n+1)}$$

**4.** Find the value of:

$$\\left(\\sum_{n=1}^{50} n^2\\right) - \\left(\\sum_{n=11}^{50} n^2\\right)$$

**5.** Expand and simplify:

$$\\sum_{j=1}^{n} 4(2 + 2j)^2$$

**6.** Expand and simplify:

$$\\sum_{i=1}^{n} \\left(\\sum_{j=1}^{i} 6j\\right)$$

**7.** Evaluate:

$$\\prod_{k=2}^{n} \\left(1 - \\frac{1}{k^2}\\right)$$

**8.** *(AHSME 1991)* Let $T_n = 1 + 2 + 3 + \\cdots + n$ and:

$$P_n = \\frac{T_2}{T_2 - 1} \\cdot \\frac{T_3}{T_3 - 1} \\cdot \\frac{T_4}{T_4 - 1} \\cdots \\frac{T_n}{T_n - 1}$$

for $n = 2, 3, 4, \\ldots$. Find $P_{1991}$.

**9.** *(AMC 12, 1997)* Find the sum:

$$\\frac{1}{1 \\cdot 3} + \\frac{1}{3 \\cdot 5} + \\cdots + \\frac{1}{(2n-1)(2n+1)} + \\cdots + \\frac{1}{255 \\cdot 257}$$

**10.** *(2001–2002 Mandelbrot)* Define a sequence of numbers by $a_n = 3n^2 + 3n + 1$ so that $a_1 = 7$, $a_2 = 19$, $a_3 = 37$, and so on. Calculate:

$$a_1 + a_2 + \\cdots + a_{100}$$

**11.** *(San Jose State University, Problem of the Week 2011)* Let $p$ and $q$ be positive integers such that:

$$\\frac{p}{q} = 1 + \\frac{1}{2} - \\frac{2}{3} + \\frac{1}{4} + \\frac{1}{5} - \\frac{2}{6} + \\cdots + \\frac{1}{1507} + \\frac{1}{1508} - \\frac{2}{1509} + \\cdots + \\frac{1}{2010}$$

Prove that $p$ is divisible by 2011.

*Hint:* $\\left(-\\frac{3}{3k}\\right)$, and find 2 groups of sums.

**12.** *(USAMT 1999)* Determine the value of:

$$S = \\sqrt{1 + \\frac{1}{1^2} + \\frac{1}{2^2}} + \\sqrt{1 + \\frac{1}{2^2} + \\frac{1}{3^2}} + \\cdots + \\sqrt{1 + \\frac{1}{1999^2} + \\frac{1}{2000^2}}$$

*Hint:* The numerator $n^4 + 2n^3 + 3n^2 + 2n + 1$ is actually the expansion of $(n^2 + n + 1)^2$.

$$f(n) = \\frac{n^2 + n + 1}{n(n+1)}$$

**13.** *(Mandelbrot 1997)* Compute the product:

$$\\frac{(1998^2 - 1996^2)(1998^2 - 1995^2) \\cdots (1998^2 - 0^2)}{(1997^2 - 1996^2)(1997^2 - 1995^2) \\cdots (1997^2 - 0^2)}$$

**14.** Evaluate the infinite product:

$$\\prod_{n=2}^{\\infty} \\left(\\frac{n^3 - 1}{n^3 + 1}\\right)$$

*Hint:* Factor the cubic terms using the sum and difference of cubes identities and observe the telescoping pattern.`,
  },
  {
    "slug": "classical-mechanics-rotational-dynamics",
    "title": "Classical Mechanics: Rotational Dynamics and the Center of Mass",
    "excerpt": "A fundamental analysis of rigid body motion, deriving the conservation of the center of mass and the separation of rotational and translational kinetic energy.",
    "date": "2026-03-05",
    "readTime": "8 min read",
    "category": "Classical Physics",
    "content": "### 1. Dynamics of Many-Particle Systems\n\nIn classical mechanics, the motion of a system of $N$ particles is governed by Newton's Second Law. The complexity of tracking individual trajectories is resolved by decomposing the motion into two independent components: the translation of the system as a whole and the rotation about a central point.\n\n#### 1.1 The Center of Mass (CoM)\n\nThe Center of Mass $\\mathbf{R}$ serves as the dynamical center of the system. It is defined as the mass-weighted position vector:\n\n$$ \\mathbf{R} = \\frac{1}{M} \\sum_{i=1}^{N} m_i \\mathbf{r}_i $$\n\nWhere $M$ is the total mass. The velocity of the center of mass, $\\mathbf{V}_{cm}$, remains constant unless acted upon by a net **external** force ($ \\mathbf{F}_{ext} $). Internal forces (such as the tension in the springs connecting the masses) sum to zero and cannot accelerate the CoM.\n\n### 2. Rotational Dynamics\n\nWhen a system rotates, its resistance to angular acceleration is determined not just by its mass, but by the distribution of that mass relative to the axis of rotation. This property is quantified as the **Moment of Inertia ($I$)**.\n\n#### 2.1 König's Theorem\n\nThe total kinetic energy ($T$) of a moving, rotating system can be separated into translational and rotational terms:\n\n$$ T_{total} = \\frac{1}{2} M V_{cm}^2 + \\frac{1}{2} I_{cm} \\omega^2 $$\n\n* **Translational Term ($ \\frac{1}{2} M V_{cm}^2 $):** The energy associated with the motion of the Center of Mass itself.\n* **Rotational Term ($ \\frac{1}{2} I_{cm} \\omega^2 $):** The energy associated with the motion of particles *relative* to the Center of Mass.\n\n<div style=\"text-align: center; margin: 30px 0;\">\n  <img src=\"YOUR_UPLOADED_CLASSICAL_ROTATION_GIF.gif\" alt=\"Rigid Body Rotation Simulation\" style=\"max-width: 100%; border-radius: 4px; border: 1px solid #ddd;\" />\n  <p style=\"font-size: 0.9em; color: #444; margin-top: 10px;\"><em>Figure 1: A discrete system of masses undergoing pure rotation. The Red Cross indicates the Center of Mass, which remains stationary ($\\mathbf{V}_{cm} = 0$) because no external forces are applied.</em></p>\n</div>\n\n#### 2.2 Conservation of Angular Momentum\n\nFor an isolated system, the total angular momentum $\\mathbf{L}$ is conserved. If the system changes shape (e.g., the springs stretch due to centripetal force), the Moment of Inertia $I$ changes. To conserve $\\mathbf{L} = I \\omega$, the angular velocity $\\omega$ must adjust inversely. This coupling between structure and rotation is a foundational principle of rigid body dynamics."
  }





]



export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return posts
}
