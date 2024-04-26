//Q1 part 1
(declare-fun p () Bool)
(declare-fun q () Bool)
(declare-fun r () Bool)
(assert (not (or (or (not p) q) (or p r))))
(check-sat)

//Q1 part 2
(declare-fun p () Bool)
(declare-fun q () Bool)
(declare-fun r () Bool)
(assert (not (and (or (or (not p) q) r) (or r (not r)))))
(check-sat)

//Q1 part 3
(declare-fun p () Bool)
(declare-fun q () Bool)
(declare-fun r () Bool)
(declare-fun s () Bool)
(assert (not (and (or (or (not p) q) r) (or r (not s)))))
(check-sat)

//Q2 part 1
(declare-fun x () Int)
(assert (<= 7 (- 3 (* 2 x))))
(check-sat)
(get-model)

//Q2 part 2
(declare-fun x () Int)
(assert (>= (- (* 5 (- x 1)) 1) (- (* 6 x) 1)))
(check-sat)
(get-model)

