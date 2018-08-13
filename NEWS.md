Update v0.0.3

- Upgraded the package to work on Julia 1.0
- Renamed some functions to be more in line with LinearAlgebra.jl:

```julia
reig               -> reigen
rsvdfact           -> rsvd
idfact             -> id

svdfact_restricted -> svd_restricted
svdfact_re         -> svd_re
eigfact_restricted -> eigen_restricted
eigfact_re         -> eigen_re
eigfact_nystrom    -> eigen_nystrom
eigfact_onepass    -> eigen_onepass
```