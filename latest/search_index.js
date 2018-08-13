var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#Randomized-1",
    "page": "Home",
    "title": "Randomized Linear Algebra",
    "category": "section",
    "text": "RandomizedLinAlg.jl is a Julia package that provides some randomized algorithms for numerical linear algebra as advocated in [Halko2011].reigen\nrsvd\nrsvd_fnkz"
},

{
    "location": "index.html#RandomizedLinAlg.rcond",
    "page": "Home",
    "title": "RandomizedLinAlg.rcond",
    "category": "function",
    "text": "rcond(A, iters=1)\n\nEstimate matrix condition number randomly.\n\nArguments\n\nA: matrix whose condition number to estimate. Must be square and\n\nsupport premultiply (A*⋅) and solve (A\\⋅).\n\niters::Int = 1: number of power iterations to run.\n\nKeywords\n\np::Real = 0.05: probability that estimate fails to hold as an upper bound.\n\nOutput\n\nInterval (x, y) which contains κ(A) with probability 1 - p.\n\nImplementation note\n\n[Dixon1983] originally describes this as a computation that can be done by computing the necessary number of power iterations given p and the desired accuracy parameter θ=y/x. However, these bounds were only derived under the assumptions of exact arithmetic. Empirically, iters≥4 has been seen to result in incorrect results in that the computed interval does not contain the true condition number. This implemention therefore makes iters an explicitly user-controllable parameter from which to infer the accuracy parameter and hence the interval containing κ(A). ```\n\n\n\n\n\n"
},

{
    "location": "index.html#Condition-number-estimate-1",
    "page": "Home",
    "title": "Condition number estimate",
    "category": "section",
    "text": "rcond"
},

{
    "location": "index.html#RandomizedLinAlg.reigmin",
    "page": "Home",
    "title": "RandomizedLinAlg.reigmin",
    "category": "function",
    "text": "reigmin(A, iters=1)\n\nEstimate minimal eigenvalue randomly.\n\nArguments\n\nA: Matrix whose maximal eigenvalue to estimate.\n\nMust be square and support premultiply (A*⋅).\n\niters::Int=1: Number of power iterations to run. (Recommended: iters ≤ 3)\n\nKeywords\n\np::Real=0.05: Probability that estimate fails to hold as an upper bound.\n\nOutput\n\nInterval (x, y) which contains the maximal eigenvalue of A with probability 1 - p.\n\nReferences\n\nCorollary of Theorem 1 in [Dixon1983]\n\n\n\n\n\n"
},

{
    "location": "index.html#RandomizedLinAlg.reigmax",
    "page": "Home",
    "title": "RandomizedLinAlg.reigmax",
    "category": "function",
    "text": "reigmax(A, iters=1)\n\nEstimate maximal eigenvalue randomly.\n\nArguments\n\nA: Matrix whose maximal eigenvalue to estimate.\n\nMust be square and support premultiply (A*⋅).\n\niters::Int=1: Number of power iterations to run. (Recommended: iters ≤ 3)\n\nKeywords\n\np::Real=0.05: Probability that estimate fails to hold as an upper bound.\n\nOutput\n\nInterval (x, y) which contains the maximal eigenvalue of A with probability 1 - p.\n\nReferences\n\nCorollary of Theorem 1 in [Dixon1983]\n\n\n\n\n\n"
},

{
    "location": "index.html#Extremal-eigenvalue-estimates-1",
    "page": "Home",
    "title": "Extremal eigenvalue estimates",
    "category": "section",
    "text": "reigmin\nreigmax"
},

{
    "location": "index.html#RandomizedLinAlg.rnorm",
    "page": "Home",
    "title": "RandomizedLinAlg.rnorm",
    "category": "function",
    "text": "rnorm(A, mvps)\n\nCompute a probabilistic upper bound on the norm of a matrix A. ‖A‖ ≤ α √(2/π) maxᵢ ‖Aωᵢ‖ with probability p=α^(-mvps).\n\nArguments\n\nA: matrix whose norm to estimate.\nmvps::Int: number of matrix-vector products to compute.\n\nKeywords\n\np::Real=0.05: probability of upper bound failing.\n\nOutput\n\nEstimate of ‖A‖.\n\nSee also rnorms for a different estimator that uses  premultiplying by both A and A\'.\n\nReferences\n\nLemma 4.1 of Halko2011\n\n\n\n\n\n"
},

{
    "location": "index.html#RandomizedLinAlg.rnorms",
    "page": "Home",
    "title": "RandomizedLinAlg.rnorms",
    "category": "function",
    "text": "rnorms(A, iters=1)\n\nEstimate matrix norm randomly using A\'A.\n\nCompute a probabilistic upper bound on the norm of a matrix A.\n\nρ = √(‖(A\'A)ʲω‖/‖(A\'A)ʲ⁻¹ω‖)\n\nwhich is an estimate of the spectral norm of A produced by iters steps of the power method starting with normalized ω, is a lower bound on the true norm by a factor\n\nρ ≤ α ‖A‖\n\nwith probability greater than 1 - p, where p = 4\\sqrt(n/(iters-1)) α^(-2iters).\n\nArguments\n\nA: matrix whose norm to estimate.\niters::Int = 1: mumber of power iterations to perform.\n\nKeywords\n\np::Real = 0.05: probability of upper bound failing.\nAt = A\': Transpose of A.\n\nOutput\n\nEstimate of ‖A‖.\n\nSee also rnorm for a different estimator that does not require premultiplying by A\'\n\nReferences\n\nAppendix of [Liberty2007].\n\n\n\n\n\n"
},

{
    "location": "index.html#Norm-estimate-1",
    "page": "Home",
    "title": "Norm estimate",
    "category": "section",
    "text": "rnorm\nrnorms"
},

{
    "location": "index.html#RandomizedLinAlg.id",
    "page": "Home",
    "title": "RandomizedLinAlg.id",
    "category": "function",
    "text": "id(A, k, l)\n\nCompute and return the interpolative decomposition of A: A ≈ B * P\n\nWhere:\n\nB\'s columns are a subset of the columns of A\nsome subset of P\'s columns are the k x k identity, no entry of P exceeds magnitude 2, and\n||B * P - A|| ≲ σ(A, k+1), the (k+1)st singular value of A.\n\nArguments\n\nA: Matrix to factorize\n\nk::Int: Number of columns of A to return in B\n\nl::Int: Length of random vectors to project onto\n\nOutput\n\n(::Interpolative): interpolative decomposition.\n\nImplementation note\n\nThis is a hacky version of the algorithms described in \\cite{Liberty2007} and \\cite{Cheng2005}. The former refers to the factorization (3.1) of the latter.  However, it is not actually necessary to compute this factorization in its entirely to compute an interpolative decomposition.\n\nInstead, it suffices to find some permutation of the first k columns of Y = R * A, extract the subset of A into B, then compute the P matrix as B\\A which will automatically compute P using a suitable least-squares algorithm.\n\nThe approximation we use here is to compute the column pivots of Y, rather then use the true column pivots as would be computed by a column- pivoted QR process.\n\nReferences\n\n\\cite[Algorithm I]{Liberty2007}\n\n@article{Cheng2005,\n    author = {Cheng, H and Gimbutas, Z and Martinsson, P G and Rokhlin, V},\n    doi = {10.1137/030602678},\n    issn = {1064-8275},\n    journal = {SIAM Journal on Scientific Computing},\n    month = jan,\n    number = {4},\n    pages = {1389--1404},\n    title = {On the Compression of Low Rank Matrices},\n    volume = {26},\n    year = {2005}\n}\n\n\n\n\n\n"
},

{
    "location": "index.html#Interpolative-Decomposition-1",
    "page": "Home",
    "title": "Interpolative Decomposition",
    "category": "section",
    "text": "id[Halko2011]: Halko, Nathan, Per-Gunnar Martinsson, and Joel A. Tropp. \"Finding structure with randomness: Probabilistic algorithms for constructing approximate matrix decompositions.\" SIAM review 53.2 (2011): 217-288.[Dixon1983]: Dixon, John D. \"Estimating extremal eigenvalues and condition numbers of matrices.\" SIAM Journal on Numerical Analysis 20.4 (1983): 812-814.[Liberty2007]: Liberty, Edo, et al. \"Randomized algorithms for the low-rank approximation of matrices.\" Proceedings of the National Academy of Sciences 104.51 (2007): 20167-20172."
},

]}
