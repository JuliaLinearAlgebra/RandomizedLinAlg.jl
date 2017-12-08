var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#RandomizedAlgorithms.reig",
    "page": "Home",
    "title": "RandomizedAlgorithms.reig",
    "category": "Function",
    "text": "reig(A, l)\n\nCompute the spectral (Eigen) decomposition of A using a randomized algorithm.\n\nArguments\n\nA: input matrix.\nl::Int: number of eigenpairs to find.\n\nOutput\n\n::Base.LinAlg.Eigen: eigen decomposition.\n\nImplementation note\n\nThis is a wrapper around eigfact_onepass() which uses the randomized samples found using srft(l).\n\n\n\n"
},

{
    "location": "index.html#RandomizedAlgorithms.rsvdfact",
    "page": "Home",
    "title": "RandomizedAlgorithms.rsvdfact",
    "category": "Function",
    "text": "rsvdfact(A, n, p=0)\n\nCompute partial singular value decomposition of A using a randomized algorithm.\n\nArguments\n\nA: input matrix.\n\nn::Int: number of singular value/vector pairs to find.\n\np::Int=0: number of extra vectors to include in computation.\n\nOutput\n\n::SVD: singular value decomposition.\n\nwarning: Accuracy\nThis variant of the randomized singular value decomposition is the most commonly found implementation but is not recommended for accurate computations, as it often has trouble finding the n largest singular pairs, but rather finds n large singular pairs which may not necessarily be the largest.\n\nImplementation note\n\nThis function calls rrange, which uses naive randomized rangefinding to compute a basis for a subspace of dimension n (Algorithm 4.1 of [Halko2011]), followed by svdfact_restricted(), which computes the exact SVD factorization on the restriction of A to this randomly selected subspace (Algorithm 5.1 of [Halko2011]).\n\nAlternatively, you can mix and match your own randomized algorithm using any of the randomized range finding algorithms to find a suitable subspace and feeding the result to one of the routines that computes the SVD restricted to that subspace.\n\n\n\n"
},

{
    "location": "index.html#RandomizedAlgorithms.rsvd_fnkz",
    "page": "Home",
    "title": "RandomizedAlgorithms.rsvd_fnkz",
    "category": "Function",
    "text": "rsvd_fnkz(A, k)\n\nCompute the randomized SVD by iterative refinement from randomly selected columns/rows [Friedland2006].\n\nArguments\n\nA: matrix whose SVD is desired;\nk::Int: desired rank of approximation (k ≤ min(m, n)).\n\nKeywords\n\nl::Int = k: number of columns/rows to sample at each iteration (1 ≤ l ≤ k);\nN::Int = minimum(size(A)): maximum number of iterations;\nϵ::Real = prod(size(A))*eps(): relative threshold for convergence, as measured by growth of the spectral norm;\nmethod::Symbol = :eig: problem to solve.\n:eig: eigenproblem.\n:svd: singular problem.\nverbose::Bool = false: print convergence information at each iteration.\n\nReturn value\n\nSVD object of rank ≤ k.\n\n[Friedland2006]: Friedland, Shmuel, et al. \"Fast Monte-Carlo low rank approximations for  matrices.\" System of Systems Engineering, 2006 IEEE/SMC International  Conference on. IEEE, 2006.\n\n\n\n"
},

{
    "location": "index.html#Randomized-1",
    "page": "Home",
    "title": "Randomized algorithms",
    "category": "section",
    "text": "RandomizedAlgorithms.jl is a Julia package that provides some randomized algorithms for numerical linear algebra as advocated in [Halko2011].reig\nrsvdfact\nrsvd_fnkz"
},

{
    "location": "index.html#RandomizedAlgorithms.rcond",
    "page": "Home",
    "title": "RandomizedAlgorithms.rcond",
    "category": "Function",
    "text": "rcond(A, iters=1)\n\nEstimate matrix condition number randomly.\n\nArguments\n\nA: matrix whose condition number to estimate. Must be square and\n\nsupport premultiply (A*⋅) and solve (A\\⋅).\n\niters::Int = 1: number of power iterations to run.\n\nKeywords\n\np::Real = 0.05: probability that estimate fails to hold as an upper bound.\n\nOutput\n\nInterval (x, y) which contains κ(A) with probability 1 - p.\n\nImplementation note\n\n[Dixon1983] originally describes this as a computation that can be done by computing the necessary number of power iterations given p and the desired accuracy parameter θ=y/x. However, these bounds were only derived under the assumptions of exact arithmetic. Empirically, iters≥4 has been seen to result in incorrect results in that the computed interval does not contain the true condition number. This implemention therefore makes iters an explicitly user-controllable parameter from which to infer the accuracy parameter and hence the interval containing κ(A). ```\n\n\n\n"
},

{
    "location": "index.html#Condition-number-estimate-1",
    "page": "Home",
    "title": "Condition number estimate",
    "category": "section",
    "text": "rcond"
},

{
    "location": "index.html#RandomizedAlgorithms.reigmin",
    "page": "Home",
    "title": "RandomizedAlgorithms.reigmin",
    "category": "Function",
    "text": "reigmin(A, iters=1)\n\nEstimate minimal eigenvalue randomly.\n\nArguments\n\nA: Matrix whose maximal eigenvalue to estimate.\n\nMust be square and support premultiply (A*⋅).\n\niters::Int=1: Number of power iterations to run. (Recommended: iters ≤ 3)\n\nKeywords\n\np::Real=0.05: Probability that estimate fails to hold as an upper bound.\n\nOutput\n\nInterval (x, y) which contains the maximal eigenvalue of A with probability 1 - p.\n\nReferences\n\nCorollary of Theorem 1 in [Dixon1983]\n\n\n\n"
},

{
    "location": "index.html#RandomizedAlgorithms.reigmax",
    "page": "Home",
    "title": "RandomizedAlgorithms.reigmax",
    "category": "Function",
    "text": "reigmax(A, iters=1)\n\nEstimate maximal eigenvalue randomly.\n\nArguments\n\nA: Matrix whose maximal eigenvalue to estimate.\n\nMust be square and support premultiply (A*⋅).\n\niters::Int=1: Number of power iterations to run. (Recommended: iters ≤ 3)\n\nKeywords\n\np::Real=0.05: Probability that estimate fails to hold as an upper bound.\n\nOutput\n\nInterval (x, y) which contains the maximal eigenvalue of A with probability 1 - p.\n\nReferences\n\nCorollary of Theorem 1 in [Dixon1983]\n\n\n\n"
},

{
    "location": "index.html#Extremal-eigenvalue-estimates-1",
    "page": "Home",
    "title": "Extremal eigenvalue estimates",
    "category": "section",
    "text": "reigmin\nreigmax"
},

{
    "location": "index.html#RandomizedAlgorithms.rnorm",
    "page": "Home",
    "title": "RandomizedAlgorithms.rnorm",
    "category": "Function",
    "text": "rnorm(A, mvps)\n\nCompute a probabilistic upper bound on the norm of a matrix A. ‖A‖ ≤ α √(2/π) maxᵢ ‖Aωᵢ‖ with probability p=α^(-mvps).\n\nArguments\n\nA: matrix whose norm to estimate.\nmvps::Int: number of matrix-vector products to compute.\n\nKeywords\n\np::Real=0.05: probability of upper bound failing.\n\nOutput\n\nEstimate of ‖A‖.\n\nSee also rnorms for a different estimator that uses  premultiplying by both A and A'.\n\nReferences\n\nLemma 4.1 of Halko2011\n\n\n\n"
},

{
    "location": "index.html#RandomizedAlgorithms.rnorms",
    "page": "Home",
    "title": "RandomizedAlgorithms.rnorms",
    "category": "Function",
    "text": "rnorms(A, iters=1)\n\nEstimate matrix norm randomly using A'A.\n\nCompute a probabilistic upper bound on the norm of a matrix A.\n\nρ = √(‖(A'A)ʲω‖/‖(A'A)ʲ⁻¹ω‖)\n\nwhich is an estimate of the spectral norm of A produced by iters steps of the power method starting with normalized ω, is a lower bound on the true norm by a factor\n\nρ ≤ α ‖A‖\n\nwith probability greater than 1 - p, where p = 4\\sqrt(n/(iters-1)) α^(-2iters).\n\nArguments\n\nA: matrix whose norm to estimate.\niters::Int = 1: mumber of power iterations to perform.\n\nKeywords\n\np::Real = 0.05: probability of upper bound failing.\nAt = A': Transpose of A.\n\nOutput\n\nEstimate of ‖A‖.\n\nSee also rnorm for a different estimator that does not require premultiplying by A'\n\nReferences\n\nAppendix of [Liberty2007].\n\n\n\n"
},

{
    "location": "index.html#Norm-estimate-1",
    "page": "Home",
    "title": "Norm estimate",
    "category": "section",
    "text": "rnorm\nrnorms[Halko2011]: Halko, Nathan, Per-Gunnar Martinsson, and Joel A. Tropp. \"Finding structure with randomness: Probabilistic algorithms for constructing approximate matrix decompositions.\" SIAM review 53.2 (2011): 217-288.[Dixon1983]: Dixon, John D. \"Estimating extremal eigenvalues and condition numbers of matrices.\" SIAM Journal on Numerical Analysis 20.4 (1983): 812-814.[Liberty2007]: Liberty, Edo, et al. \"Randomized algorithms for the low-rank approximation of matrices.\" Proceedings of the National Academy of Sciences 104.51 (2007): 20167-20172."
},

]}
